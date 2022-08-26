import { ChakraProvider } from '@chakra-ui/react'

import LoginPage from 'src/pages/LoginPage/LoginPage'
import SignupPage from 'src/pages/SignupPage/SignupPage'
import { theme } from 'src/utils/constants'
import { DECORATORS } from 'src/utils/decorators'

import AuthLayout from './AuthLayout'

import '../../index.css'
import '../../scaffold.css'

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  decorators: [...DECORATORS],
}

const Provider = ({ children }) => (
  <ChakraProvider theme={theme}>{children}</ChakraProvider>
)

export const Login = () => (
  <Provider>
    <AuthLayout>
      <LoginPage />
    </AuthLayout>
  </Provider>
)

export const SignUp = () => (
  <Provider>
    <AuthLayout>
      <SignupPage />
    </AuthLayout>
  </Provider>
)
