const db = require('better-sqlite3')('./fb.db')
const { v4: uuidv4 } = require('uuid')
import { loginValidate, registerValidate } from '../validators'
import _ from 'lodash'
import bcrypt from 'bcryptjs'
import { auth } from '../util/auth'

db.exec('create table if not exists user(userId, firstName, lastName, email, password)')
db.exec('create table if not exists posts(postId, content, userId)')
// db.exec('drop table user')
// db.exec('drop table posts')

export const findUser = async (filter = {}) => {
  if (filter.userId) {
    return await [db.prepare('select * from user where (userId = ?)').get(filter.userId)]
  } else {
    return await db.prepare('select * from user').all()
  }
}
export const findUserById = async (userId) => {
  return await db.prepare('select * from user where (userId = ?)').get(userId)
}

export const register = async (input) => {
  const { firstName, lastName, email } = input
  // validate input
  const { error } = await registerValidate.validate(input)
  if (error) throw new Error(error)

  // check same email
  const hasSame = await db.prepare('select * from user where (email = ?)').get(email)
  if (hasSame) throw new Error('Email is registed.')

  //hash password
  const password = await bcrypt.hash(input.password, 10)

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
  return { userId, firstName, lastName, email, password }
}

export const login = async (input) => {
  const { email, password } = input
  const { error } = await loginValidate.validate(input)
  if (error) {
    throw new Error(error)
  }
  const user = await db.prepare(`select * from user where (email = ? )`).get(email)
  let isPasswordSame = bcrypt.compareSync(password, user.password)
  if (!isPasswordSame) throw Error('email or password incorrect.')

  return { token: auth(user.userId, user.firstName, user.lastName, user.email), user: user }
}
export const createPost = async (input, user) => {
  const postId = uuidv4()
  const { content } = input
  db.prepare('insert into posts (postId, content, userId) values (@postId, @content, @userId)').run({
    postId,
    content,
    userId: user.userId,
  })

  return { postId, content, author: user }
}

export const queryPosts = async (filter = {}) => {
  let posts = await db.prepare('select * from posts').all()
  return posts
}
