import { createServer } from "@graphql-yoga/node";

const typeDefinitions = /* GraphQL */ `
  type Query {
    sum(numbers: [Float!]!): Float!
    greeting(name: String, message: String): String!
    me: User!
    grades: [Int!]!
  }

  type User {
    id: Int!
    name: String!
    isMarried: Boolean!
    salary: Float!
    tagline: String
  }
`;

const resolvers = {
  Query: {
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
        isMarried: false,
        salary: 100100.9,
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
