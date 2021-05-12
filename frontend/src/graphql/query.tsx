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
