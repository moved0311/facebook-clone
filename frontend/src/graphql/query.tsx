import { gql } from '@apollo/client'

export const QUERY_USER_PROFILE = gql`
  query QUERY_USER_PROFILE {
    userProfile {
      userId
      email
      password
      firstName
      lastName
    }
  }
`

export const QUERY_POSTS = gql`
  query QUERY_POSTS {
    posts {
      postId
      content
      author {
        userId
        firstName
        lastName
        email
      }
    }
  }
`
