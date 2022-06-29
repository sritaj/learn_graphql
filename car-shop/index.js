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
  
  type Group {
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
