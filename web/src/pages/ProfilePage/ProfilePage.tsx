import { useState } from 'react'

import ReactPaginate from 'react-paginate'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags } from '@redwoodjs/web'

import { ProfilePageContext } from 'src/utils/contexts/ProfilePageContext'

import PostsCell from '../../components/PostsCell'

import './ProfilePage.scss'
// eslint-disable-next-line import/order
import { Box, Image } from '@chakra-ui/react'

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
      <Box className="header-container">
        <Image
          className="header-container__img"
          src={currentUser.headerImg.file.url}
        />
      </Box>
      <PostsCell page={currentPage} authorId={currentUser.id} />
      <ReactPaginate
        breakLabel="..."
        nextLabel="Next"
        onPageChange={handlePageClick}
        pageRangeDisplayed={3}
        pageCount={pageCount}
        previousLabel="Previous"
        renderOnZeroPageCount={null}
        containerClassName="pagination"
        nextClassName="pagination__btn"
        previousClassName="pagination__btn"
        activeClassName="pagination__active"
      />
    </ProfilePageContext.Provider>
  )
}

export default ProfilePage
