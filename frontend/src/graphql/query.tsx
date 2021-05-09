import { gql } from '@apollo/client'

export const QUERY_USERS = gql`
  query QUERY_USER($filter: FilterOptions) {
    users(filter: $filter) {
      userId
      email
      password
      firstName
      lastName
    }
  }
`
