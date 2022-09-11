import { useContext, useState } from 'react'

import ReactPaginate from 'react-paginate'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import { ProfilePageContext } from 'src/utils/contexts/ProfilePageContext'

import PostsCell from '../../components/PostsCell'

const ProfilePage = () => {
  const [currentPage, setCurrentPage] = useState(1)
  const [pageCount, setPageCount] = useState(1)
  const { currentUser } = useAuth()
  const handlePageClick = (event: any) => {
    setCurrentPage(event.selected + 1)
  }

  return (
    <ProfilePageContext.Provider
      value={{
        pageCount: pageCount,
        setPageCount(count) {
          setPageCount(count)
        },
      }}
    >
      <MetaTags title="Profile" description="Profile page" />
      <PostsCell page={currentPage} authorId={currentUser.id} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="next >"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="< previous"
        renderOnZeroPageCount={null}
      />
    </ProfilePageContext.Provider>
  )
}

export default ProfilePage
