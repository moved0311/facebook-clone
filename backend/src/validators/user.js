import Joi from 'joi'

const firstName = Joi.string().min(3).max(255).required()
const lastName = Joi.string().min(3).max(255).required()
const email = Joi.string().email().required()
const password = Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()

export const loginValidate = Joi.object({
  email,
  password,
})

export const registerValidate = Joi.object({
  firstName,
  lastName,
  email,
  password,
})
