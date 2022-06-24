const { gql } = require("apollo-server");

exports.typeDefs = gql`
  type Query {
    products: [Product!]!
    categories: [Category]!
    # Querying object with one variable
    product(id: ID!): Product
    category(id: ID!): Category
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
  }

  type Category {
    id: ID!
    name: String!
    # Specifying One to Many mapping
    products: [Product!]
  }
`;
