import { v4 as uuidv4 } from "uuid";
import { GraphQLYogaError } from "@graphql-yoga/node";
import bcryptjs from "bcrypt";
import JWT from "jsonwebtoken";
import getUserId from "../utils/getUserId";

const JWT_AUTH_TOKEN = "MyAccessTokenForBlogProject";

const Mutation = {
  //Mutations resolvers for Data stored in db.js file
  createUser: async (parent, args, { db, prisma }, info) => {
    const emailTaken = db.users.some((user) => user.email === args.data.email);

    if (emailTaken) {
      return {
        userErrors: [
          {
            message: "Email taken",
          },
        ],
        user: null,
      };
    }

    const newuser = {
      id: uuidv4(),
      ...args.data,
    };
    const prismaEntry = {
      ...args.data,
    };

    db.users.push(newuser);

    await prisma.users.create({
      data: {
        name: args.data.name,
        email: args.data.email,
        age: args.data.age,
      },
    });

    return { userErrors: [], user: newuser };
  },
  deleteUser: (parent, args, { db }, info) => {
    const userIndex = db.users.findIndex((user) => user.id === args.id);

    if (userIndex === -1) {
      return {
        userErrors: [{ message: "User not found" }],
        user: null,
      };
    }

    const deletedUser = db.users.splice(userIndex, 1);

    posts = db.posts.filter((post) => {
      const match = post.author === args.id;

      if (match) {
        comments = db.comments.filter((comment) => {
          return comment.post !== post.id;
        });
      }
      return !match;
    });

    comments = db.comments.filter((comment) => {
      comment.author !== args.id;
    });

    return { userErrors: [], user: deletedUser[0] };
  },
  updateUser: (parent, args, { db }, info) => {
    const user = db.users.find((user) => user.id === args.id);

    if (!user) {
      return {
        userErrors: [{ message: "User not found" }],
        user: null,
      };
    }

    if (typeof args.data.email === "string") {
      const emailTaken = db.users.some(
        (user) => user.email === args.data.email
      );

      if (emailTaken) {
        return {
          userErrors: [
            {
              message: "Email taken",
            },
          ],
          user: null,
        };
      }

      user.email = args.data.email;
    }

    if (typeof args.data.name === "string") {
      user.name = args.data.name;
    }

    if (typeof args.data.age !== "undefined") {
      user.age = args.data.age;
    }

    return { userErrors: [], user: user };
  },
  createPost: (parent, args, { db, pubSub }, info) => {
    const authorExist = db.users.some((user) => user.id === args.data.author);

    if (!authorExist) {
      return {
        userErrors: [
          {
            message: "Author not found",
          },
        ],
        post: null,
      };
    }

    const newPost = {
      id: uuidv4(),
      ...args.data,
    };

    db.posts.push(newPost);

    if (args.data.published) {
      pubSub.publish(`post`, { post: { mutation: "CREATED", data: newPost } });
    }

    return { userErrors: [], post: newPost };
  },
  deletePost: (parent, args, { db, pubSub }, info) => {
    const postIndex = db.posts.findIndex((post) => post.id === args.id);

    if (postIndex === -1) {
      return {
        userErrors: [
          {
            message: "Post not found",
          },
        ],
        post: null,
      };
    }

    const [postDeleted] = db.posts.splice(postIndex, 1);

    console.log(postDeleted);

    db.comments = db.comments.filter((comment) => {
      return comment.post !== args.id;
    });

    if (postDeleted.published) {
      pubSub.publish(`post`, {
        post: { mutation: "DELETED", data: postDeleted },
      });
    }

    return { userErrors: [], post: postDeleted };
  },
  updatePost: (parent, args, { db, pubSub }, info) => {
    const post = db.posts.find((post) => post.id === args.id);
    const originalPost = { ...post };

    if (!post) {
      return {
        userErrors: [
          {
            message: "Post not found",
          },
        ],
        post: null,
      };
    }

    const author = db.posts.find((post) => post.author === args.author);

    if (!author) {
      return {
        userErrors: [
          {
            message: "Post belongs to different Author",
          },
        ],
        post: null,
      };
    }

    if (typeof args.data.title === "string") {
      post.title = args.data.title;
    }

    if (typeof args.data.body === "string") {
      post.body = args.data.body;
    }

    if (typeof args.data.published === "boolean") {
      post.published = args.data.published;

      if (originalPost.published && !post.published) {
        pubSub.publish(`post`, {
          post: { mutation: "DELETED", data: originalPost },
        });
      } else if (!originalPost.published && post.published) {
        pubSub.publish(`post`, {
          post: { mutation: "CREATED", data: post },
        });
      } else if (post.published) {
        pubSub.publish(`post`, {
          post: { mutation: "UPDATED", data: post },
        });
      }
    }

    return { userErrors: [], post: post };
  },
  createComment: (parent, args, { db, pubSub }, info) => {
    const authorExist = db.users.some((user) => user.id === args.data.author);

    if (!authorExist) {
      return {
        userErrors: [
          {
            message: "Author not found",
          },
        ],
        comment: null,
      };
    }

    const postExist = db.posts.some((post) => {
      return post.id === args.data.post && post.published;
    });

    if (!postExist) {
      return {
        userErrors: [
          {
            message: "Post not found",
          },
        ],
        comment: null,
      };
    }

    const newComment = {
      id: uuidv4(),
      ...args.data,
    };

    db.comments.push(newComment);

    pubSub.publish(`comment ${args.data.post}`, {
      comment: { mutation: "CREATED", data: newComment },
    });

    return {
      userErrors: [],
      comment: newComment,
    };
  },
  deleteComment: (parent, args, { db, pubSub }, info) => {
    const commentIndex = db.comments.findIndex(
      (comment) => comment.id === args.id
    );

    if (commentIndex === -1) {
      return {
        userErrors: [
          {
            message: "Comment not found",
          },
        ],
        comment: null,
      };
    }

    const [commentDeleted] = db.comments.splice(commentIndex, 1);

    pubSub.publish(`comment ${commentDeleted.post}`, {
      comment: { mutation: "DELETED", data: commentDeleted },
    });

    return {
      userErrors: [],
      comment: commentDeleted,
    };
  },
  updateComment: (parent, args, { db, pubSub }, info) => {
    const comment = db.comments.find((comment) => comment.id === args.id);

    if (!comment) {
      return {
        userErrors: [
          {
            message: "Comment not found",
          },
        ],
        comment: null,
      };
    }

    const post = db.posts.find((post) => post.id === comment.post);
    const { id } = post;

    const author = db.comments.find(
      (comment) => comment.author === args.author
    );

    if (!author) {
      return {
        userErrors: [
          {
            message: "Comment belongs to different user",
          },
        ],
        comment: null,
      };
    }

    if (typeof args.data.text === "string") {
      comment.text = args.data.text;
    }

    pubSub.publish(`comment ${id}`, {
      comment: { mutation: "UPDATED", data: comment },
    });

    return { userErrors: [], comment: comment };
  },
  //Mutations Resolvers for Data stored in Postgresql via PRISMA ORM
  createUserPrisma: async (parent, args, { prisma }, info) => {
    const { name, email, password, age } = args.data;

    const emailTaken = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (emailTaken) {
      throw new GraphQLYogaError("Email taken");
    }

    if (password.length < 8) {
      throw new GraphQLYogaError(
        "Password is too short!! Min 8 characters is required."
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const createdUser = await prisma.users.create({
      data: {
        name,
        email,
        age,
        password: hashedPassword,
      },
    });

    return {
      user: createdUser,
      token: JWT.sign({ id: createdUser.id }, JWT_AUTH_TOKEN),
    };
  },
  updateUserPrisma: async (parent, args, { prisma }, info) => {
    const { id } = args;
    const { name, email, age } = args.data;

    const userExist = await prisma.users.findUnique({
      where: { id: Number(id) },
    });

    if (!userExist) {
      throw new GraphQLYogaError("User not found");
    }

    const emailTaken = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (emailTaken) {
      throw new GraphQLYogaError("Email taken");
    }

    const updatedUser = await prisma.users.update({
      where: {
        id: Number(id),
      },
      data: {
        name,
        email,
        age,
      },
    });

    return updatedUser;
  },
  deleteUserPrisma: async (parent, args, { prisma }, info) => {
    const { id } = args;

    const userExist = await prisma.users.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!userExist) {
      throw new GraphQLYogaError("User is not available");
    }

    const deletedUser = await prisma.users.delete({
      where: { id: Number(id) },
    });

    return deletedUser;
  },
  createPostPrisma: async (parent, args, { prisma }, info) => {
    const { title, body, published, author } = args.data;

    const userID = getUserId(request);
    const userExist = await prisma.users.findUnique({
      where: { id: Number(author) },
    });

    if (!userExist) {
      throw new GraphQLYogaError("User not found");
    }

    const createdPost = await prisma.posts.create({
      data: {
        title,
        body,
        published,
        authorID: Number(author),
      },
    });

    return createdPost;
  },
  updatePostPrisma: async (parent, args, { prisma }, info) => {
    const { id, author } = args;
    const { title, body, published } = args.data;

    const postExist = await prisma.posts.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postExist) {
      throw new GraphQLYogaError("Post is not available");
    }

    const correctAuthor = await prisma.posts.findMany({
      where: {
        AND: [{ authorID: Number(author), id: Number(id) }],
      },
    });

    console.log(correctAuthor);
    if (correctAuthor.length === 0) {
      throw new GraphQLYogaError("Current User is not the owner of the post");
    }

    const updatedPost = await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
        published,
      },
    });

    return updatedPost;
  },
  deletePostPrisma: async (parent, args, { prisma }, info) => {
    const { id } = args;

    const postExist = await prisma.posts.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postExist) {
      throw new GraphQLYogaError("Post is not available");
    }

    const deletedPost = await prisma.posts.delete({
      where: { id: Number(id) },
    });

    return deletedPost;
  },
  createCommentPrisma: async (parent, args, { prisma }, info) => {
    const { text, author, post } = args.data;

    const postExist = await prisma.posts.findUnique({
      where: {
        id: Number(post),
      },
    });

    if (!postExist) {
      throw new GraphQLYogaError("Post is not available");
    }

    const userExist = await prisma.users.findUnique({
      where: {
        id: Number(author),
      },
    });

    if (!userExist) {
      throw new GraphQLYogaError("User is not available");
    }

    const comment = await prisma.comments.create({
      data: {
        text,
        authorID: Number(author),
        postID: Number(post),
      },
    });

    return comment;
  },
  updateCommentPrisma: async (parent, args, { prisma }, info) => {
    const { id, author } = args;
    const { text } = args.data;

    const commentExist = await prisma.comments.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!commentExist) {
      throw new GraphQLYogaError("Comment is not available");
    }

    const correctAuthor = await prisma.comments.findMany({
      where: {
        AND: [{ authorID: Number(author), id: Number(id) }],
      },
    });

    if (correctAuthor.length === 0) {
      throw new GraphQLYogaError(
        "Current User is not the owner of the comment"
      );
    }

    const updatedComment = await prisma.comments.update({
      where: {
        id: Number(id),
      },
      data: {
        text,
      },
    });

    return updatedComment;
  },
  deleteCommentPrisma: async (parent, args, { prisma }, info) => {
    const { id } = args;

    const commentExist = await prisma.comments.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!commentExist) {
      throw new GraphQLYogaError("Comment is not available");
    }

    const deletedComment = await prisma.comments.delete({
      where: { id: Number(id) },
    });

    return deletedComment;
  },
  //Mutations resolvers for Data stored in Postgresql via PRISMA ORM using JWT Token for Authentication & Authorization
  loginPrisma: async (parent, args, { prisma }, info) => {
    const { email, password } = args.data;

    const userExist = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    if (!userExist) {
      throw new GraphQLYogaError("Invalid Credentials!!");
    }

    const { password: encryptedPassword } = userExist;

    const passwordMatch = await bcryptjs.compare(password, encryptedPassword);

    if (!passwordMatch) {
      throw new GraphQLYogaError("Invalid Credentials!!");
    }

    return {
      user: userExist,
      token: JWT.sign({ id: userExist.id }, JWT_AUTH_TOKEN),
    };
  },
  //
  createPostPrismaWithJWTToken: async (
    parent,
    args,
    { prisma, request },
    info
  ) => {
    const { title, body, published } = args.data;

    const userId = getUserId(request);

    const createdPost = await prisma.posts.create({
      data: {
        title,
        body,
        published,
        authorID: Number(userId),
      },
    });

    return createdPost;
  },
  updatePostPrismaWithJWTToken: async (
    parent,
    args,
    { prisma, request },
    info
  ) => {
    const { id, author } = args;

    const postExist = await prisma.posts.findUnique({
      where: {
        id: Number(id),
      },
    });

    if (!postExist) {
      throw new GraphQLYogaError("Post is not available");
    }
    const { title, body, published } = args.data;

    const userId = getUserId(request);

    const correctAuthor = await prisma.posts.findMany({
      where: {
        AND: [{ authorID: Number(userId), id: Number(id) }],
      },
    });

    if (correctAuthor[0].id !== userId) {
      throw new GraphQLYogaError("Post belongs to different user");
    }

    const updatedPost = await prisma.posts.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        body,
        published,
      },
    });

    console.log(updatedPost);

    return updatedPost;
  },
};

export { Mutation as default };
