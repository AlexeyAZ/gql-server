const typeDefs = `
  type Post {
    _id: String,
    title: String,
    content: String,
    createdAt: String,
    author: User,
  },
  extend type Query {
    getAllPosts: [Post]
  },
  extend type Mutation {
    createPost(title: String!, content: String!, userId: String!): Post,
  }
`;

module.exports = typeDefs;