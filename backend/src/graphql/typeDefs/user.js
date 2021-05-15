const { gql } = require('apollo-server-express')

export const typeDef = gql`
  type User {
    userId: String
    firstName: String
    lastName: String
    email: String
    password: String
  }
  type Auth {
    user: User
    token: String
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
`
