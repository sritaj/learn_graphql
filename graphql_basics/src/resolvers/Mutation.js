import { v4 as uuidv4 } from "uuid";
import { GraphQLYogaError } from "@graphql-yoga/node";

const Mutation = {
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
  //Mutations for Prisma
  createUserPrisma: async (parent, args, { prisma }, info) => {
    const { name, email, age } = args.data;

    const emailTaken = await prisma.users.findUnique({
      where: {
        email,
      },
    });

    console.log(emailTaken);
    if (emailTaken) {
      throw new GraphQLYogaError("Email taken");
    }

    const createdUser = await prisma.users.create({
      data: {
        name,
        email,
        age,
      },
    });

    return createdUser;
  },
};

export { Mutation as default };
