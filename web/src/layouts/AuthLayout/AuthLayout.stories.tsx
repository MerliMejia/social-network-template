import LoginPage from 'src/pages/LoginPage/LoginPage'
import SignupPage from 'src/pages/SignupPage/SignupPage'

import AuthLayout from './AuthLayout'

import '../../index.css'
import '../../scaffold.css'

export default {
  title: 'Layouts/AuthLayout',
  component: AuthLayout,
  decorators: [
    (Story) => (
      <div style={{ margin: '3em', backgroundColor: '#B43BC4' }}>
        <Story />
      </div>
    ),
  ],
}

export const Login = () => (
  <AuthLayout>
    <LoginPage />
  </AuthLayout>
)

export const SignUp = () => (
  <AuthLayout>
    <SignupPage />
  </AuthLayout>
)
