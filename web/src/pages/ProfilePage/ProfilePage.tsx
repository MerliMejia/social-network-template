import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import PostsCell from '../../components/PostsCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <PostsCell page={1} authorId={currentUser.id} />
    </>
  )
}

export default ProfilePage
