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
    id: ID!
    name: String!
    imageId: ID!
    bodyHTML: String!
    memberships: [GroupMembership]!
  }

  type AutomaticGroup {
    id: ID!
    name: String!
    imageId: ID!
    bodyHTML: String!
    feature: [AutomaticGroupFeatures]!
    applyFeaturesSeparately: Boolean!
    memberships: [GroupMembership]!
  }

  type AutomaticGroupFeatures {
    column: String!
  }

  type GroupMembership {
    groupID: ID!
    carID: ID!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});
