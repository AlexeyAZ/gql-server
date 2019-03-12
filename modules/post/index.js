const { gql } = require('apollo-server-express')
const schema = require('./post.schema')
const resolvers = require('./post.resolvers')

module.exports = {
  typeDefs: gql`
    ${schema}
  `,
  resolvers,
}