import { createServer } from "@graphql-yoga/node";

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
    id: 2,
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
  },
  {
    id: 2,
    title: "NodeJS",
    body: "Become Backend Expert",
    published: true,
  },
  {
    id: 3,
    title: "FSD",
    body: "Rise and Shine - All In One",
    published: false,
  },
];

//Type Definitions
const typeDefinitions = /* GraphQL */ `
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    post: Post!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    age: Int
  }

  type Post {
    id: ID!
    title: String!
    body: String!
    published: Boolean!
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
    me: () => {
      return {
        id: 34523,
        name: "Sritaj",
        email: "sritajp@gmail.com",
      };
    },
    post: () => {
      return {
        id: 2,
        name: "SP",
        email: "sritaj.info@gmail.com",
        age: 32,
      };
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
