const typeDefinitions = /* GraphQL */ `
  type Query {
    users(query: String): [User!]!
    usersPrisma(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    createUser(data: CreateUserInput!): UserPayload!
    createUserPrisma(data: CreateUserInput!): User!
    deleteUser(id: ID!): UserPayload!
    updateUser(id: ID!, data: UpdateUserInput!): UserPayload!
    createPost(data: CreatePostInput!): PostPayLoad!
    deletePost(id: ID!): PostPayLoad!
    updatePost(id: ID!, author: ID!, data: UpdatePostInput!): PostPayLoad!
    createComment(data: CreateCommentInput!): CommentPayLoad!
    deleteComment(id: ID!): CommentPayLoad!
    updateComment(
      id: ID!
      author: ID!
      data: UpdateCommentInput!
    ): CommentPayLoad!
  }

  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
    post: PostSubscriptionPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  input UpdateUserInput {
    name: String
    email: String
    age: Int
  }

  input CreatePostInput {
    title: String!
    body: String!
    published: Boolean!
    author: ID!
  }

  input UpdatePostInput {
    title: String
    body: String
    published: Boolean
  }

  input CreateCommentInput {
    text: String!
    author: ID!
    post: ID!
  }

  input UpdateCommentInput {
    text: String!
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

  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    data: Post!
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    data: Comment!
  }
`;

export { typeDefinitions as default };
