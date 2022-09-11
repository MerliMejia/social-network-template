import type {
  QueryResolvers,
  MutationResolvers,
  PostResolvers,
} from 'types/graphql'

import { db } from 'src/lib/db'

const POSTS_PER_PAGE = 3

export const postPage = ({ page = 1, authorId }) => {
  // eslint-disable-next-line no-debugger
  if (page === 0) {
    page = 1
  }
  const offset = (page - 1) * POSTS_PER_PAGE

  return {
    posts: db.post.findMany({
      take: POSTS_PER_PAGE,
      skip: offset,
      orderBy: { id: 'asc' },
      where: { authorId },
    }),
    count: new Promise((res) => {
      db.post.count().then((count) => {
        res(Math.round(count / POSTS_PER_PAGE))
      })
    }),
  }
}

export const posts: QueryResolvers['posts'] = ({ authorId }) => {
  return db.post.findMany({ where: { authorId } })
}

export const post: QueryResolvers['post'] = ({ id }) => {
  return db.post.findUnique({
    where: { id },
  })
}

export const createPost: MutationResolvers['createPost'] = ({ input }) => {
  return db.post.create({
    data: input,
  })
}

export const updatePost: MutationResolvers['updatePost'] = ({ id, input }) => {
  return db.post.update({
    data: input,
    where: { id },
  })
}

export const deletePost: MutationResolvers['deletePost'] = ({ id }) => {
  return db.post.delete({
    where: { id },
  })
}

export const Post: PostResolvers = {
  author: (_obj, { root }) =>
    db.post.findUnique({ where: { id: root.id } }).author(),
}
