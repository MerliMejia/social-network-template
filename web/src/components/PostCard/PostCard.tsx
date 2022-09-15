import {
  Box,
  Flex,
  Heading,
  Icon,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  Text,
} from '@chakra-ui/react'
import { AiOutlineMore } from 'react-icons/ai'
import { Post } from 'types/graphql'

import { POST_CARD_CONTENT_MAX_LENGHT } from 'src/utils/constants'

import CustomLink from '../CustomLink/CustomLink'

interface PostCardProps {
  post: Post
}

import './PostCard.scss'

const PostCard = ({ post }: PostCardProps) => {
  return (
    <Box className="PostCard" borderWidth={1}>
      <Flex>
        <Heading size={'md'} as={'h2'}>
          {post.author.name}
        </Heading>
        <Spacer />
        <Menu>
          <MenuButton as={'button'}>
            <Icon color={'lavender.300'} boxSize={25} as={AiOutlineMore} />
          </MenuButton>
          <MenuList>
            <MenuItem>Edit Post</MenuItem>
          </MenuList>
        </Menu>
      </Flex>
      <Text className="PostCard__email" fontSize={'sm'} color={'lavender.300'}>
        {post.author.email}
      </Text>
      <Text
        className="PostCard__content"
        fontSize={'sm'}
        color={'lavender.500'}
      >
        {post.content.substring(0, POST_CARD_CONTENT_MAX_LENGHT)}...
      </Text>

      <CustomLink className="PostCard__link" to="#">
        View More
      </CustomLink>
    </Box>
  )
}

export default PostCard
