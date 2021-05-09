import { gql } from '@apollo/client'

export const CREATE_USER = gql`
  mutation CREATE_USER($input: CreateUserInput) {
    createUser(input: $input) {
      userId
      email
      password
      firstName
      lastName
    }
  }
`
export const LOGIN = gql`
  mutation Login($input: LoginInput) {
    login(input: $input) {
      userId
      firstName
      lastName
      email
    }
  }
`
