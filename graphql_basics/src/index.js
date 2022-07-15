import { createServer } from "@graphql-yoga/node";
import { v4 as uuidv4 } from "uuid";

//Demo User Data
const users = [
  {
    id: 1,
    name: "Sritaj",
    email: "sritajp@gmail.com",
  },
  {
    id: 2,
    name: "SP",
    email: "sritaj.info@gmail.com",
    age: 32,
  },
  {
    id: 3,
    name: "Lipan",
    email: "lipan.info@gmail.com",
  },
];
//Demo Post Data
const posts = [
  {
    id: 1,
    title: "GraphQL course",
    body: "course containing A-Z of GraphQL",
    published: true,
    author: 1,
  },
  {
    id: 2,
    title: "NodeJS",
    body: "Become Backend Expert",
    published: true,
    author: 2,
  },
  {
    id: 3,
    title: "FSD",
    body: "Rise and Shine - All In One",
    published: false,
    author: 3,
  },
];

//Demo Comment Data
const comments = [
  {
    id: 1,
    text: "Comment 1",
    author: 1,
    post: 1,
  },
  {
    id: 2,
    text: "Comment 2",
    author: 2,
    post: 2,
  },
  {
    id: 3,
    text: "Comment 3",
    author: 2,
    post: 2,
  },
  {
    id: 4,
    text: "Comment 4",
    author: 3,
    post: 3,
  },
];

//Type Definitions
const typeDefinitions = /* GraphQL */ `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(name: String!, email: String!, age: Int): UserPayload!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
    posts: [Post!]!
    comments: [Comment!]!
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
    author: User!
    comments: [Comment!]!
  }

  type Comment {
    id: ID!
    text: String!
    author: User!
    post: Post!
  }

  type UserPayload {
    userErrors: [UserError!]!
    user: User
  }

  type UserError {
    message: String!
  }
`;

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
      const emailTaken = users.some((user) => user.email === args.email);

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

      const { name, email, age } = args;

      const newuser = {
        id: uuidv4(),
        name,
        email,
        age,
      };

      users.push(newuser);

      return { userErrors: [], user: newuser };
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
    typeDefs: [typeDefinitions],
    resolvers: [resolvers],
  },
});

server.start(() => {
  console.log("Server is up");
});
