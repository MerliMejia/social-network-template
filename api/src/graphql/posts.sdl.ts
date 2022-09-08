export const schema = gql`
  type Post {
    id: Int!
    title: String!
    content: String!
    tags: [String]!
    likes: Int!
    author: User!
    authorId: Int!
  }

  type Query {
    posts(authorId: Int!): [Post!]! @skipAuth
    post(id: Int!): Post @skipAuth
  }

  input CreatePostInput {
    title: String!
    content: String!
    tags: [String]!
    likes: Int!
    authorId: Int!
  }

  input UpdatePostInput {
    title: String
    content: String
    tags: [String]!
    likes: Int
    authorId: Int
  }

  type Mutation {
    createPost(input: CreatePostInput!): Post! @requireAuth
    updatePost(id: Int!, input: UpdatePostInput!): Post! @requireAuth
    deletePost(id: Int!): Post! @requireAuth
  }
`
