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

  type PostPage {
    posts: [Post!]!
    count: Int!
  }

  type Query {
    postPage(page: Int, authorId: Int!): PostPage @requireAuth
    posts(authorId: Int!): [Post!]! @requireAuth
    post(id: Int!): Post @requireAuth
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
