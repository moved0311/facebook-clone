import { findUser, register, login } from '../../models'
import _ from 'lodash'

export const user = {
  Query: {
    users: async (parent, args) => {
      const filter = _.get(args, 'filter', {})
      return findUser(filter)
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
