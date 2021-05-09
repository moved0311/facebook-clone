const { v4: uuidv4 } = require('uuid')
const db = require('better-sqlite3')('./fb.db')
const _ = require('lodash')

db.exec('create table if not exists user(userId, firstName, lastName, email, password)')
// db.exec('drop table user')
const resolvers = {
  Query: {
    users: async (parent, args) => {
      const filter = _.get(args, 'filter', {})
      if (filter.userId) {
        return await [db.prepare('select * from user where (userId = ?)').get(filter.userId)]
      } else {
        return await db.prepare('SELECT * FROM user').all()
      }
    },
  },
  Mutation: {
    createUser: (parent, args) => {
      const { firstName, lastName, email, password } = args.input
      const userId = uuidv4()
      db.prepare(
        'insert into user (userId, firstName, lastName, email, password) values (@userId, @firstName, @lastName, @email, @password)'
      ).run({
        userId,
        firstName,
        lastName,
        email,
        password,
      })
      return { userId, ...args.input }
    },
    login: async (parent, args) => {
      const { email, password } = args.input
      const user = await db.prepare(`SELECT * FROM user where (email = ? and password = ? )`).get(email, password)
      return user
    },
  },
}
module.exports = { resolvers }
