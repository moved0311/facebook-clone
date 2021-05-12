import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config'

export const auth = (userId, firstName, lastName, email) => {
  const token = jwt.sign(
    {
      userId,
      firstName,
      lastName,
      email,
    },
    APP_SECRET,
    { expiresIn: '3d' }
  )
  return token
}

export const authUser = (req) => {
  const header = req.headers.authorization
  if (!header) throw new Error('Authorization token is required.')
  try {
    return jwt.verify(header, APP_SECRET)
  } catch (err) {
    throw new Error('Authorization token is invalid.')
  }
  return null
}
