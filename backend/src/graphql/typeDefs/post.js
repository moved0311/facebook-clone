const { gql } = require('apollo-server-express')

export const typeDef = gql`
  type Post {
    postId: ID
    content: String
    author: User
  }
  input PostInput {
    content: String!
  }
`
