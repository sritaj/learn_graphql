const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]
  }
  type Car {
    id: ID!
    color: String!
    make: String!
  }
  type ManualGroup {
    Image
    [Car]
  }

  type AutomaticGroup {
    Image
    [Car]
    [AutomationGroupFeatures]
  }

  type AutomaticGroupFeatures {
  }

`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});
