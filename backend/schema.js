const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    name: String
    email: String
    password: String
  }
  type Query {
    users: [User]
  }
  input CreateUserInput {
    name: String
    email: String
    password: String
  }
  type Mutation {
    createUser(input: CreateUserInput): User
  }
`
module.exports = typeDefs
