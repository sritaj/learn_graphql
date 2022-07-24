import { prisma } from "..";
import { GraphQLYogaError } from "@graphql-yoga/node";
import getUserId from "../utils/getUserId";

const Query = {
  users: (parent, args, { db }, info) => {
    if (!args.query) return db.users;

    return db.users.filter((user) => {
      return user.name.toLowerCase().includes(args.query.toLowerCase());
    });
  },
  posts: (parent, args, { db }, info) => {
    if (!args.query) return db.posts;

    return db.posts.filter((post) => {
      return (
        post.title.toLowerCase().includes(args.query.toLowerCase()) ||
        post.body.toLowerCase().includes(args.query.toLowerCase())
      );
    });
  },
  comments: (parent, args, { db }, info) => {
    return db.comments;
  },
  me: () => {
    return {
      id: 34523,
      name: "Sritaj",
      email: "sritajp@gmail.com",
    };
  },
  post: () => {
    return {
      id: 1,
      title: "GraphQL course",
      body: "course containing A-Z of GraphQL",
      published: true,
    };
  },
  //Query for Prisma
  usersPrisma: async (parent, args, { prisma }, info) => {
    if (!args.query) return await prisma.users.findMany();

    return await prisma.users.findMany({
      where: {
        name: {
          startsWith: args.query,
          mode: "insensitive",
        },
      },
    });
  },
  postsPrisma: async (parent, args, { prisma }, info) => {
    if (!args.query) return await prisma.posts.findMany();

    return await prisma.posts.findMany({
      where: {
        title: {
          startsWith: args.query,
          mode: "insensitive",
        },
      },
    });
  },
  commentsPrisma: async (parent, args, { prisma }, info) => {
    return await prisma.comments.findMany();
  },
  postPrisma: async (parent, args, { prisma, request }, info) => {
    const authenticationRequired = false;
    const userId = getUserId(request, authenticationRequired);
    const { id } = args;

    if (!userId) {
      const postExists = await prisma.posts.findMany({
        where: { AND: { id: Number(id), published: true } },
      });

      if (postExists.length === 0) {
        throw new GraphQLYogaError("Post not found");
      }

      return postExists[0];
    }

    const post = await prisma.posts.findUnique({
      where: { id: Number(id) },
    });

    if (!post) {
      throw new GraphQLYogaError("Post not found -1");
    }

    return post;
  },
};

export { Query as default };
