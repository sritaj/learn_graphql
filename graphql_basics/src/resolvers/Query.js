import { prisma } from "..";
import { GraphQLYogaError } from "@graphql-yoga/node";
import getUserId from "../utils/getUserId";

const Query = {
  //Query resolvers for Data stored in db.js file/hardcoded data
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
  //Query Resolvers for Data stored in Postgresql via PRISMA ORM
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
    if (!args.query)
      return await prisma.posts.findMany({
        take: 4,
        skip: 0,
        orderBy: {
          id: "asc",
        },
      });

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
  //Query resolvers for Data stored in Postgresql via PRISMA ORM using JWT Token for Authentication & Authorization
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
      throw new GraphQLYogaError("Post not found");
    }

    return post;
  },
  userPrisma: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request, true);
    const { id } = args;

    const userExists = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!userExists) {
      throw new GraphQLYogaError("User doesn't exist");
    }

    if (userExists.id !== userId) {
      throw new GraphQLYogaError(
        "Logged In User is different, cannot query for specified User ID"
      );
    }

    return userExists;
  },
  myPosts: async (parent, args, { prisma, request }, info) => {
    const userId = getUserId(request, true);

    const posts = await prisma.users.findMany({
      where: { authorID: Number(userId) },
    });

    if (!query) {
      if (posts.length === 0) {
        throw new GraphQLYogaError("Post(s) not found");
      }

      return posts;
    }

    const specificPosts = posts.findMany({
      where: {
        title: {
          startsWith: args.query,
          mode: "insensitive",
        },
      },
    });

    return specificPosts;
  },
};

export { Query as default };
