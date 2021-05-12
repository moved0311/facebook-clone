import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const ENDPOINT = 'http://localhost:4000/graphql'

const httpLink = createHttpLink({
  uri: ENDPOINT,
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  console.log('token:', token)
  return {
    headers: {
      ...headers,
      authorization: token,
    },
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export { client }
