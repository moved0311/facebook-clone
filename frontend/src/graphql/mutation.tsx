import { gql } from '@apollo/client'

export const Register = gql`
  mutation Register($input: RegisterInput) {
    register(input: $input) {
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
