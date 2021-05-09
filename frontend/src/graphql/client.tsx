import { ApolloClient, InMemoryCache } from '@apollo/client'

const ENDPOINT = 'http://localhost:4000/graphql'
const client = new ApolloClient({
  uri: ENDPOINT,
  cache: new InMemoryCache(),
})

export { client }
