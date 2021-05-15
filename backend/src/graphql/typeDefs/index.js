const { gql } = require('apollo-server-express')
import { typeDef as User } from './user'
import { typeDef as Post } from './post'

const typeDefs = gql`
  type Query {
    users(filter: FilterOptions): [User]
    userProfile: User
    posts: [Post]
  }
  type Mutation {
    register(input: RegisterInput): User
    login(input: LoginInput): Auth
    createPost(input: PostInput): Post
  }
`
export default [typeDefs, User, Post]
