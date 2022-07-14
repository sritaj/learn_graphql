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
    sum(numbers: [Float!]!): Float!
    greeting(name: String, message: String): String!
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    me: User!
    grades: [Int!]!
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
    sum: (parent, args, context, info) => {
      if (args.numbers.length == 0) return 0;

      return args.numbers.reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      });
    },
    greeting: (parent, args, context, info) => {
      if (args.name && args.message) {
        return `Hi ${args.name}, have a ${args.message}`;
      } else {
        return "Hello";
      }
    },
    me: () => {
      return {
        id: 34523,
        name: "Sritaj",
        email: "sritajp@gmail.com",
      };
    },
    grades: () => {
      return [90, 83, 92];
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
