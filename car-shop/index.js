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
    id: ID!
    featureSet: GroupFeature
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    imageID: Image!
    bodyHTML: String!
  }

  type Image {
    id: ID!
    url: String!
  }

  type GroupFeatureSet {
    features: [GroupFeatures!]!
    applyFeaturesSeperately: Boolean!
  }

  type GroupFeatures {
    feature: String!
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});
