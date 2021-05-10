const { gql } = require('apollo-server-express')

const typeDefs = gql`
  type User {
    userId: String
    firstName: String
    lastName: String
    email: String
    password: String
  }
  input RegisterInput {
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
    register(input: RegisterInput): User
    login(input: LoginInput): User
  }
`
module.exports = typeDefs
