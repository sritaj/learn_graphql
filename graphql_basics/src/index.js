import { createServer } from "@graphql-yoga/node";
import Query from "./resolvers/Query";
import Mutation from "./resolvers/Mutation";
import Post from "./resolvers/Post";
import User from "./resolvers/User";
import Comment from "./resolvers/Comment";
import typeDefinitions from "./schema";
import db from "./db";

const server = createServer({
  schema: {
    typeDefs: typeDefinitions,
    resolvers: { Query, Mutation, Post, User, Comment },
  },
  context: { db },
});

server.start(() => {
  console.log("Server is up");
});
