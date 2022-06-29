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
    [GroupMemebership]
  }

  type AutomaticGroup {
    Image
    [GroupMemebership]
    [AutomationGroupFeatures]
  }

  type AutomaticGroupFeatures {
  }

  type GroupMembership {
    Group
    Car
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});
