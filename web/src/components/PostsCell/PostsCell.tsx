import { useContext } from 'react'

import { Container } from '@chakra-ui/react'
import type { PostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

import PostCard from '../PostCard/PostCard'

export const QUERY = gql`
  query PostsQuery($page: Int, $authorId: Int!) {
    postPage(page: $page, authorId: $authorId) {
      posts {
        id
        title
        content
        tags
        likes
        author {
          id
          name
          email
        }
      }
      count
    }
  }
`

export const Loading = () => <div>Loading...</div>

export const Empty = () => <div>Empty</div>

export const Failure = ({ error }: CellFailureProps) => (
  <div style={{ color: 'red' }}>Error: {error.message}</div>
)

export const Success = ({ postPage }: CellSuccessProps<PostsQuery>) => {
  return (
    <Container>
      {postPage.posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </Container>
  )
}
