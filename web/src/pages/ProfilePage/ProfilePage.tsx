import { useEffect, useState } from 'react'

import { TbWorld } from 'react-icons/tb'
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
  Divider,
  Flex,
  Heading,
  Image,
  List,
  ListIcon,
  ListItem,
  Skeleton,
  Spinner,
  Stack,
  Text,
} from '@chakra-ui/react'
import CustomLink from 'src/components/CustomLink/CustomLink'
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
          wrap={'wrap'}
          alignContent={'center'}
          justifyContent={'space-evenly'}
        >
          <Box
            className="body-container__left"
            style={{ borderStyle: 'solid', borderColor: 'red' }}
          >
            <Center height={0}>
              <Avatar
                src={currentUser.profileImg.file.url}
                className="body-container__left__avatar"
                size={'2xl'}
              />
            </Center>
            <Flex
              className="body-container__left__follow-container"
              alignContent={'center'}
              justifyContent={'space-evenly'}
            >
              <Box>
                <Heading color={'lavender.400'} as={'h3'} size={'sm'}>
                  Following
                </Heading>
                <Center>
                  <Text
                    className="body-container__left__follow-container__data"
                    fontWeight={'bold'}
                  >
                    {currentUser.following.length}
                  </Text>
                </Center>
              </Box>
              <Box>
                <Heading color={'lavender.400'} as={'h3'} size={'sm'}>
                  Followers
                </Heading>
                <Center>
                  <Text
                    className="body-container__left__follow-container__data"
                    fontWeight={'bold'}
                  >
                    {currentUser.followers.length}
                  </Text>
                </Center>
              </Box>
            </Flex>
            <List spacing={3} marginTop={25}>
              <ListItem>
                <Divider borderWidth={1} marginBottom={3} />
                <ListIcon as={TbWorld} color="purple.500" />
                <CustomLink to={currentUser.website}>
                  {currentUser.website.substring(0, 30)}
                </CustomLink>
                <Divider borderWidth={1} marginTop={3} />
              </ListItem>
              <ListItem>
                <ListIcon as={TbWorld} color="purple.500" />
                <CustomLink to={currentUser.facebook}>
                  {currentUser.facebook.substring(0, 30)}
                </CustomLink>
                <Divider borderWidth={1} marginTop={3} />
              </ListItem>
              <ListItem>
                <ListIcon as={TbWorld} color="purple.500" />
                <CustomLink to={currentUser.twitter}>
                  {currentUser.twitter.substring(0, 30)}
                </CustomLink>
                <Divider borderWidth={1} marginTop={3} />
              </ListItem>
              <ListItem>
                <ListIcon as={TbWorld} color="purple.500" />
                <CustomLink to={currentUser.instagram}>
                  {currentUser.instagram.substring(0, 30)}
                </CustomLink>
                <Divider borderWidth={1} marginTop={3} />
              </ListItem>
              <ListItem>
                <ListIcon as={TbWorld} color="purple.500" />
                <CustomLink to={currentUser.youtube}>
                  {currentUser.youtube.substring(0, 30)}
                </CustomLink>
                <Divider borderWidth={1} marginTop={3} />
              </ListItem>
            </List>
          </Box>

          <Box className="body-container__center">
            <Heading className="body-container__center__name">
              {currentUser.name}
            </Heading>
            <Text
              color={'lavender.500'}
              className="body-container__center__headline"
            >
              {currentUser.headline}
            </Text>
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
