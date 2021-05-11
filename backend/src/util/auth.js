import jwt from 'jsonwebtoken'
import { APP_SECRET } from '../config'

export const auth = (firstName, lastName, email) => {
  const token = jwt.sign(
    {
      firstName,
      lastName,
      email,
    },
    APP_SECRET,
    { expiresIn: '3d' }
  )
  return token
}
