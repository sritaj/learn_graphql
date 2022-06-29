const { ApolloServer, gql } = require("apollo-server");

const typeDefs = gql`
  type Query {
    cars: [Car!]
  }

  type Mutation {
    groupDelete(groupId: ID!)
    groupPublish(groupId: ID!)
    groupUnpublish(groupId: ID!)
    groupAddCars(groupId: ID!, carId: ID!)
    groupRemoveCars(groupId: ID!, carId: ID!)
    groupCreate(name: String! image: ImageInput! description: String! featureSet: GroupFeatureFields)
    groupUpdate(groupId: ID! groupInput: GroupInput!)
  }

  input GroupInput {
    name: String 
    image: ImageInput 
    description: String 
    featureSet: GroupFeatureFields
  }
  
  input ImageInput {
    url: String!
  }

  type Car {
    id: ID!
    color: String!
    make: String!
  }

  type Group {
    id: ID!
    featureSet: GroupFeature
    hasCar(id: ID!): Boolean!
    cars(skip: Int!, take: Int!): [Car!]!
    name: String!
    imageID: Image!
    description: String!
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
    feature: GroupFeatureFields!
  }

  enum GroupFeatureFields {
    INCLINE_ENGINE
    FOUR_CYLINDER_ENGINE
    TWIN_CYLINDER_ENGINE
  }
`;

const server = new ApolloServer({
  typeDefs,
  resolvers: {},
});
