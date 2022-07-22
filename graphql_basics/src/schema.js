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
    createUser(data: CreateUserInput!): UserPayload!
    createUserPrisma(data: CreateUserInput!): AuthUserPayload!
    deleteUser(id: ID!): UserPayload!
    deleteUserPrisma(id: ID!): User!
    updateUser(id: ID!, data: UpdateUserInput!): UserPayload!
    updateUserPrisma(id: ID!, data: UpdateUserInput!): User!
    createPost(data: CreatePostInput!): PostPayLoad!
    createPostPrisma(data: CreatePostInput!): Post!
    createPostPrismaWithJWTToken(data: CreatePostInputWithToken!): Post!
    deletePost(id: ID!): PostPayLoad!
    updatePost(id: ID!, author: ID!, data: UpdatePostInput!): PostPayLoad!
    updatePostPrisma(id: ID!, author: ID!, data: UpdatePostInput!): Post!
    deletePostPrisma(id: ID!): Post!
    createComment(data: CreateCommentInput!): CommentPayLoad!
    createCommentPrisma(data: CreateCommentInput!): Comment!
    deleteComment(id: ID!): CommentPayLoad!
    deleteCommentPrisma(id: ID!): Comment!
    updateComment(
      id: ID!
      author: ID!
      data: UpdateCommentInput!
    ): CommentPayLoad!
    updateCommentPrisma(
      id: ID!
      author: ID!
      data: UpdateCommentInput!
    ): Comment!
    loginPrisma(data: UserLoginPayload!): AuthUserPayload!
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
