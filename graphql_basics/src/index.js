import { createServer, createPubSub } from "@graphql-yoga/node";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Comment from "./resolvers/Comment";
import typeDefinitions from "./schema";
import { PrismaClient } from "@prisma/client";
import db from "./db";
import { resolvers } from "./resolvers/index";

export const prisma = new PrismaClient();

const pubSub = createPubSub();

const server = createServer({
  schema: {
    typeDefs: typeDefinitions,
    resolvers: resolvers,
    Subscription: {},
  },
  context: (request) => {
    return { db, pubSub, prisma, request };
  },
});

server.start(() => {
  console.log("Server is up");
});
