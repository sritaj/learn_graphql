const { ApolloServer, gql } = require("apollo-server");

// Data Types/Scalars in Graph QL
const typeDefs = gql`
  type Query {
    name: String
    age: Int
    married: Boolean
    salary: Float
  }
`;

// Resolver
const resolvers = {
  Query: {
    name: () => {
      return "Sritaj Kumar Patel";
    },
    age: () => {
      return 32;
    },
    married: () => {
      return false;
    },
    salary: () => {
      return 100108.24;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
