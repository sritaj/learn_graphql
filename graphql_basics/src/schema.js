export const typeDefinitions = /* GraphQL */`
type Query {
  users(query: String): [User!]!
  posts(query: String): [Post!]!
  comments: [Comment!]!
  me: User!
  post: Post!
}

type Mutation {
  createUser(data: CreateUserInput!): UserPayload!
  deleteUser(id: ID!): UserPayload!
  createPost(data: CreatePostInput!): PostPayLoad!
  deletePost(id: ID!): PostPayLoad!
  createComment(data: CreateCommentInput!): CommentPayLoad!
  deleteComment(id: ID!): CommentPayLoad!
}

input CreateUserInput {
  name: String!
  email: String!
  age: Int
}

input CreatePostInput {
  title: String!
  body: String!
  published: Boolean!
  author: ID!
}

input CreateCommentInput {
  text: String!
  author: ID!
  post: ID!
}

type User {
  id: ID!
  name: String!
  email: String!
  age: Int
  posts: [Post!]!
  comments: [Comment!]!
}

type Post {
  id: ID!
  title: String!
  body: String!
  published: Boolean!
  author: User!
  comments: [Comment!]!
}

type Comment {
  id: ID!
  text: String!
  author: User!
  post: Post!
}

type UserPayload {
  userErrors: [UserError!]!
  user: User
}

type UserError {
  message: String!
}

type PostPayLoad {
  userErrors: [UserError!]!
  post: Post
}

type CommentPayLoad {
  userErrors: [UserError!]!
  comment: Comment
}
`
