const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    products(filter: ProductsFilterInput): [Product!]!
    categories: [Category]!
    # Querying object with one variable
    product(id: ID!): Product
    category(id: ID!): Category
    review(id: ID!): Review
    reviews: [Review]!
  }

  type Mutation {
    addProduct(input: AddProductInput!): Product!
    addCategory(input: AddCategoryInput!): Category!
    addProductReview(input: AddProductReviewInput!): Review!
    deleteACategory(id: ID!): Boolean!
    deleteAProduct(id: ID!): Boolean!
    deleteAReview(id: ID!): Boolean!
    updateCategory(id: ID!, input: UpdateCategoryInput!): Category!
  }

  # Specifying the product type for the above query
  type Product {
    id: ID
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
    # Specifying Many to One mapping
    category: Category
    reviews: [Review!]!
  }

  type Category {
    id: ID!
    name: String!
    # Specifying One to Many mapping
    products(filter: ProductsFilterInput): [Product!]
  }

  type Review {
    id: ID!
    date: String!
    title: String!
    comment: String!
    rating: Int!
  }

  input ProductsFilterInput {
    onSale: Boolean
    avgRating: Int
  }

  input AddCategoryInput {
    name: String!
  }

  input UpdateCategoryInput {
    name: String!
  }

  input AddProductInput {
    name: String!
    description: String!
    quantity: Int!
    price: Float!
    onSale: Boolean!
    image: String!
  }

  input AddProductReviewInput {
    date: String!
    title: String!
    comment: String!
    rating: Int!
    productID: String!
  }
`;
