import { createServer } from "@graphql-yoga/node";
import { v4 as uuidv4 } from "uuid";
import { typeDefinitions } from "./schema";
import db from "./db";

//Resolvers
const resolvers = {
  Query: {
    users: (parent, args, context, info) => {
      if (!args.query) return users;

      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase());
      });
    },
    posts: (parent, args, context, info) => {
      if (!args.query) return posts;

      return posts.filter((post) => {
        return (
          post.title.toLowerCase().includes(args.query.toLowerCase()) ||
          post.body.toLowerCase().includes(args.query.toLowerCase())
        );
      });
    },
    comments: (parent, args, context, info) => {
      return comments;
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
  },
  Mutation: {
    createUser: (parent, args, context, info) => {
      const emailTaken = users.some((user) => user.email === args.data.email);

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

      users.push(newuser);

      return { userErrors: [], user: newuser };
    },
    deleteUser: (parent, args, context, info) => {
      const userIndex = users.findIndex((user) => user.id === args.id);

      if (userIndex === -1) {
        return {
          userErrors: [{ message: "User not found" }],
          user: null,
        };
      }

      const deletedUser = users.splice(userIndex, 1);

      posts = posts.filter((post) => {
        const match = post.author === args.id;

        if (match) {
          comments = comments.filter((comment) => {
            return comment.post !== post.id;
          });
        }
        return !match;
      });

      comments = comments.filter((comment) => {
        comment.author !== args.id;
      });

      return { userErrors: [], user: deletedUser[0] };
    },
    createPost: (parent, args, context, info) => {
      const authorExist = users.some((user) => user.id === args.data.author);

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

      posts.push(newPost);

      return { userErrors: [], post: newPost };
    },
    deletePost: (parent, args, context, info) => {
      const postIndex = posts.findIndex((post) => post.id === args.id);

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

      const postDeleted = posts.splice(postIndex, 1);

      comments = comments.filter((comment) => {
        return comment.post !== args.id;
      });

      return { userErrors: [], post: postDeleted[0] };
    },
    createComment: (parent, args, context, info) => {
      const authorExist = users.some((user) => user.id === args.data.author);

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

      const postExist = posts.some((post) => {
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

      comments.push(newComment);

      return {
        userErrors: [],
        comment: newComment,
      };
    },
    deleteComment: (parent, args, context, info) => {
      const commentIndex = comments.findIndex(
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

      const commentDeleted = comments.splice(commentIndex, 1);

      return {
        userErrors: [],
        comment: commentDeleted[0],
      };
    },
  },
  Post: {
    author: ({ author }, args, context, info) => {
      return users.find((user) => {
        return user.id === author;
      });
    },
    comments: (parent, args, context, info) => {
      console.log(parent.id);
      return comments.filter((comment) => {
        return comment.post === parent.id;
      });
    },
  },
  User: {
    posts: (parent, args, context, info) => {
      return posts.filter((post) => {
        return post.author === parent.id;
      });
    },
    comments: (parent, args, context, info) => {
      return comments.filter((comment) => {
        return comment.author === parent.id;
      });
    },
  },
  Comment: {
    author: (parent, args, context, info) => {
      return users.find((user) => {
        return user.id === parent.author;
      });
    },
    post: (parent, args, context, info) => {
      return posts.find((post) => {
        return post.id === parent.post;
      });
    },
  },
};

const server = createServer({
  schema: {
    typeDefs: typeDefinitions,
    resolvers: [resolvers],
    context: { db },
  },
});

server.start(() => {
  console.log("Server is up");
});
