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

export const prisma = new PrismaClient();

const pubSub = createPubSub();

const server = createServer({
  schema: {
    typeDefs: typeDefinitions,
    resolvers: {
      Query,
      Mutation,
      Subscription,
      Post,
      User,
      Comment,
    },
    Subscription: {},
  },
  context: { db, pubSub, prisma },
});

server.start(() => {
  console.log("Server is up");
});
