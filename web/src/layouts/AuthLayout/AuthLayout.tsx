import { Box, Center, Container, Flex, Heading, Text } from '@chakra-ui/react'
import { useMediaQuery } from '@chakra-ui/react'

type AuthLayoutProps = {
  children?: React.ReactNode
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  const [isMobile] = useMediaQuery('(max-width: 768px)')

  const infoContainer = () => (
    <Container className="base-container__info">
      <Heading
        as={'h1'}
        size="2xl"
        color="purple.500"
        className="base-container__header"
      >
        RSocial
      </Heading>
      <Text className="base-container__desc">
        RSocial is a global social media template built using Redwood.js. This
        means that you have the whole full-stack project ready for you to
        customize.
      </Text>
      {isMobile === false ? (
        <img
          className="base-container__img"
          src="images/social-media.png"
          alt="Social Media"
        />
      ) : (
        ''
      )}
    </Container>
  )
  const authData = () => (
    <Container className="data-container">{children}</Container>
  )
  const desktopLayout = () => (
    <Flex className="base-container__flex">
      {infoContainer()}
      {authData()}
    </Flex>
  )
  const mobileLayout = () => (
    <Box>
      {infoContainer()}
      {authData()}
    </Box>
  )
  return (
    <Box bgColor={'purple.500'} height="100vh">
      <Center height="100vh">
        {
          <Box
            className="base-container"
            width={{ base: '100vw', md: '95vw', xl: '75vw' }}
          >
            {isMobile ? mobileLayout() : desktopLayout()}
          </Box>
        }
      </Center>
    </Box>
  )
}

export default AuthLayout
