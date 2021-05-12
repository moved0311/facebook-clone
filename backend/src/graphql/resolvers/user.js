import { findUser, register, login } from '../../models'
import _ from 'lodash'
import { authUser } from '../../util/auth'

export const user = {
  Query: {
    users: async (parent, args) => {
      const filter = _.get(args, 'filter', {})
      return findUser(filter)
    },
    userProfile: async (parent, args, { req }, info) => {
      let user = authUser(req)
      return user
    },
  },
  Mutation: {
    register: (parent, args) => {
      return register(args.input)
    },
    login: async (parent, args) => {
      return login(args.input)
    },
  },
}
