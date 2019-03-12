const { gql } = require('apollo-server-express')
const schema = require('./user.schema')
const resolvers = require('./user.resolvers')

module.exports = {
  typeDefs: gql`
    ${schema}
  `,
  resolvers,
}