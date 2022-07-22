const typeDefinitions = /* GraphQL */ `
  type Query {
    users(query: String): [User!]!
    usersPrisma(query: String): [User!]!
    posts(query: String): [Post!]!
    postsPrisma(query: String): [Post!]!
    comments: [Comment!]!
    commentsPrisma: [Comment!]!
    me: User!
    post: Post!
  }

  type Mutation {
    # Mutations for Data stored in db.js file
    createUser(data: CreateUserInput!): UserPayload!
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

    # Mutations for Data stored in Postgresql via PRISMA ORM
    createUserPrisma(data: CreateUserInput!): AuthUserPayload!
    deleteUserPrisma(id: ID!): User!
    updateUserPrisma(id: ID!, data: UpdateUserInput!): User!
    createPostPrisma(data: CreatePostInput!): Post!
    updatePostPrisma(id: ID!, author: ID!, data: UpdatePostInput!): Post!
    deletePostPrisma(id: ID!): Post!
    createCommentPrisma(data: CreateCommentInput!): Comment!
    deleteCommentPrisma(id: ID!): Comment!
    updateCommentPrisma(
      id: ID!
      author: ID!
      data: UpdateCommentInput!
    ): Comment!

    # Mutations for Data stored in Postgresql via PRISMA ORM using JWT Token for Authentication & Authorization
    loginPrisma(data: UserLoginPayload!): AuthUserPayload!
    updateUserPrismaWithJWTToken(data: UpdateUserInput!): User!
    createPostPrismaWithJWTToken(data: CreatePostInputWithToken!): Post!
    updatePostPrismaWithJWTToken(id: ID!, data: UpdatePostInput!): Post!
    deletePostPrismaWithJWTToken(id: ID!): Post!
    createCommentPrismaWithJWTToken(
      data: CreateCommentInputWithToken!
    ): Comment!
    deleteCommentPrismaWithJWTToken(id: ID!): Comment!
    updateCommentPrismaWithJWTToken(
      id: ID!
      data: UpdateCommentInput!
    ): Comment!
  }

  type Subscription {
    comment(postId: ID!): CommentSubscriptionPayload!
    post: PostSubscriptionPayload!
  }

  input CreateUserInput {
    name: String!
    email: String!
    password: String!
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

  input CreatePostInputWithToken {
    title: String!
    body: String!
    published: Boolean!
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

  input CreateCommentInputWithToken {
    text: String!
    post: ID!
  }

  input UpdateCommentInput {
    text: String!
  }

  input UserLoginPayload {
    email: String!
    password: String!
  }

  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
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

  type AuthUserPayload {
    user: User!
    token: String!
  }
`;

export { typeDefinitions as default };
