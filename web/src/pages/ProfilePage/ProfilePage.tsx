import { useEffect, useState } from 'react'

import InfiniteScroll from 'react-infinite-scroll-component'
import { Post } from 'types/graphql'

import { useAuth } from '@redwoodjs/auth'
import { MetaTags, useQuery } from '@redwoodjs/web'

import './ProfilePage.scss'
// eslint-disable-next-line import/order
import {
  Avatar,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Image,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import PostCard from 'src/components/PostCard/PostCard'
import { QUERY as POST_QUERY } from 'src/components/PostsCell/PostsCell'

const ProfilePage = () => {
  const { currentUser } = useAuth()
  const [currentPage, setCurrentPage] = useState(1)
  const [posts, setPosts] = useState<Post[]>([])
  const [hasMore, setHasMore] = useState(true)

  const { loading, data, refetch } = useQuery(POST_QUERY, {
    variables: { page: currentPage, authorId: currentUser.id },
  })

  useEffect(() => {
    if (data) {
      const newPosts: Post[] = data.postPage.posts
      if (newPosts.length > 0) {
        setPosts(posts.concat(data.postPage.posts))
      } else {
        setHasMore(false)
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (currentPage > 1) {
      refetch()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage])

  const fetchMoreData = () => {
    setTimeout(() => {
      setCurrentPage(currentPage + 1)
    }, 1000)
  }

  const renderPosts = () => (
    <InfiniteScroll
      dataLength={posts.length}
      next={fetchMoreData}
      hasMore={hasMore}
      loader={
        <Center padding={'20px'}>
          <Spinner color="purple.500" size={'md'} />
        </Center>
      }
      endMessage={
        <Center padding={'20px'}>
          <Text fontWeight={'bold'}>No more posts!</Text>
        </Center>
      }
    >
      {posts.map((post, index) => (
        <PostCard key={index} post={post} />
      ))}
    </InfiniteScroll>
  )

  return (
    <>
      <MetaTags title="Profile" description="Profile page" />
      <Box className="header-container">
        <Image
          fallback={
            <Center className="header-container__fallback" padding={'20px'}>
              <Stack width={'90%'}>
                <Skeleton
                  startColor={'purple.200'}
                  endColor={'purple.400'}
                  height="20px"
                />
                <Skeleton
                  startColor={'purple.200'}
                  endColor={'purple.400'}
                  height="20px"
                />
                <Skeleton
                  startColor={'purple.200'}
                  endColor={'purple.400'}
                  height="20px"
                />
              </Stack>
            </Center>
          }
          className="header-container__img"
          src={currentUser.headerImg.file.url}
        />
      </Box>
      <Box className="body-container">
        <Flex
          wrap={'nowrap'}
          alignContent={'center'}
          justifyContent={'space-evenly'}
        >
          <Box
            className="body-container__left"
            style={{ borderStyle: 'solid', borderColor: 'red' }}
          >
            <Avatar className="body-container__left__avatar" size={'2xl'} />
          </Box>

          <Box className="body-container__center">
            <Heading className="body-container__center__name">
              {currentUser.name}
            </Heading>
            <Center>
              {loading && <Spinner color="purple.500" size={'xl'} />}
            </Center>
            {renderPosts()}
          </Box>

          <Box style={{ borderStyle: 'solid', borderColor: 'red' }}>
            {/* <Text>????</Text> */}
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default ProfilePage
