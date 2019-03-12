const typeDefs = `
  type User {
    _id: ID,
    firstName: String,
    lastName: String,
    password: String,
    email: String,
    token: String,
  },
  extend type Query {
    getAllUsers: [User]
  },
  extend type Query {
    getUser(_id: ID!, firstName: String, lastName: String, password: String, email: String): User
  },
  extend type Query {
    loginUser(email: String!, password: String!, firstName: String, _id: ID): User
  },
  extend type Mutation {
    createUser(firstName: String!, lastName: String, password: String, email: String!): User,
  }
`;

module.exports = typeDefs;