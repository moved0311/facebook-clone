import { authUser } from '../../util/auth'
import { createPost } from '../../models'

export const post = {
  Query: {
    posts: async (parent, args, { req }, info) => {},
  },
  Mutation: {
    createPost: async (parent, args, { req }) => {
      let user = authUser(req)
      const post = await createPost(args.input, user)
      return post
    },
  },
}
