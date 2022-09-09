import type { PostsQuery } from 'types/graphql'

import type { CellSuccessProps, CellFailureProps } from '@redwoodjs/web'

export const QUERY = gql`
  query PostsQuery($page: Int, $authorId: Int!) {
    postPage(page: $page, authorId: $authorId) {
      posts {
        id
        title
        content
        tags
        likes
      }
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
    <ul>
      {postPage.posts.map((item) => {
        return <li key={item.id}>{JSON.stringify(item)}</li>
      })}
    </ul>
  )
}
