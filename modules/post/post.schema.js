const typeDefs = `
  type Post {
    _id: String,
    title: String,
    content: String,
    createdAt: String,
    updatedAt: String,
    author: String,
  },
  input MainPost {
    title: String,
    content: String,
    noteId: String!,
    localUpdatedAt: String,
    createdAt: String,
    updatedAt: String,
    _id: String,
  },
  extend type Query {
    getAllPosts: [Post]
  },
  extend type Mutation {
    createPost(title: String!, content: String!, userId: String!): Post,
    updatePost(title: String, content: String, postId: String!, localUpdatedAt: String!): Post,
    updatePosts(userId: String!, posts: [MainPost]!): [Post],
    deletePost(id: String!): Post,
  }
`;

module.exports = typeDefs;