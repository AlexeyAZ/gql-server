const typeDefs = `
  type Post {
    _id: String,
    title: String,
    content: String,
    createdAt: String,
    updatedAt: String,
    author: String,
  },
  extend type Query {
    getAllPosts: [Post]
  },
  extend type Mutation {
    createPost(title: String!, content: String!, userId: String!): Post,
    updatePost(title: String, content: String, postId: String!): Post,
    deletePost(id: String!): Post,
  }
`;

module.exports = typeDefs;