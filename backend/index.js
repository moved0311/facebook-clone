const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const typeDefs = require('./schema')
const db = require('better-sqlite3')('./fb.db')

db.exec('create table if not exists user(name, email, password)')

const resolvers = {
  Query: {
    users: async () => {
      const users = await db.prepare('SELECT * FROM user').all()
      return users
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { name, email, password } = args.input
      db.prepare('insert into user (name, email, password) values (@name, @email, @password)').run({
        name,
        email,
        password,
      })
      return args.input
    },
  },
}

async function startApolloServer() {
  const server = new ApolloServer({ typeDefs, resolvers })
  await server.start()

  const app = express()
  server.applyMiddleware({ app })

  await new Promise((resolve) => app.listen({ port: 4000 }, resolve))
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  return { server, app }
}
startApolloServer()
