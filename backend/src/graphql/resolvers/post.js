import { authUser } from '../../util/auth'
import { createPost, queryPosts, findUserById } from '../../models'
import _ from 'lodash'

export const post = {
  Query: {
    posts: async (parent, args, { req }, info) => {
      const filter = _.get(args, 'filter', {})
      const posts = queryPosts(filter)
      return posts
    },
  },
  Mutation: {
    createPost: async (parent, args, { req }) => {
      let user = authUser(req)
      const post = await createPost(args.input, user)
      return post
    },
  },
  Post: {
    author: async (parent, args, { req }) => {
      const { userId } = parent
      const user = await findUserById(userId)
      return user
    },
  },
}
