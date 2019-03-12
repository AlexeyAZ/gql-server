const typeDefs = `
  type Post {
    _id: ID,
    title: String,
    content: String,
    author: User,
  },
  extend type Query {
    getAllPosts: [Post]
  },
  extend type Mutation {
    addPost(title: String!, content: String!, userId: ID!): Post,
  }
`;

module.exports = typeDefs;