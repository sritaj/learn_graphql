import { createServer } from "@graphql-yoga/node";

const typeDefinitions = /* GraphQL */ `
  type Query {
    sum(numbers: [Float!]!): Float!
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
