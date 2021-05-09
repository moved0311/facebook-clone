const { gql } = require('apollo-server')

const typeDefs = gql`
  type User {
    userId: String
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input CreateUserInput {
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input LoginInput {
    email: String
    password: String
  }
  input FilterOptions {
    userId: String
  }
  type Query {
    users(filter: FilterOptions): [User]
  }
  type Mutation {
    createUser(input: CreateUserInput): User
    login(input: LoginInput): User
  }
`
module.exports = typeDefs
