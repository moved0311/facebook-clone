import express from 'express'
import { ApolloServer } from 'apollo-server-express'
import typeDefs from './graphql/typeDefs'
import resolvers from './graphql/resolvers'
import { APP_PORT } from './config'

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  app.disable('x-powered-by')
  server.applyMiddleware({ app })

  await new Promise((resolve) => app.listen({ port: APP_PORT }, resolve))
  console.log(`🚀 Server ready at http://localhost:${APP_PORT}${server.graphqlPath}`)
  return { server, app }
}
startApolloServer()
