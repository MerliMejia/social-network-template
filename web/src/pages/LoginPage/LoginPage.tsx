import { useEffect } from 'react'
import { useRef } from 'react'

import { Button, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import {
  Form,
  Label,
  TextField,
  PasswordField,
  FieldError,
} from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import CustomLink from 'src/components/CustomLink/CustomLink'
import './LoginPage.scss'

const LoginPage = () => {
  const { isAuthenticated, logIn } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await logIn({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Welcome back!')
    }
  }

  return (
    <>
      <MetaTags title="Login" />
      <Heading as={'h2'} size="md">
        Login
      </Heading>
      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />
      <Form onSubmit={onSubmit}>
        <Label
          name="username"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Email
        </Label>
        <TextField
          name="username"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          ref={usernameRef}
          validation={{
            required: {
              value: true,
              message: 'Username is required',
            },
          }}
        />

        <FieldError name="username" className="rw-field-error" />

        <Label
          name="password"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Password
        </Label>
        <PasswordField
          name="password"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          autoComplete="current-password"
          validation={{
            required: {
              value: true,
              message: 'Password is required',
            },
          }}
        />

        <div className="rw-forgot-link">
          <CustomLink to={routes.forgotPassword()} className="rw-forgot-link">
            Forgot Password?
          </CustomLink>
        </div>

        <FieldError name="password" className="rw-field-error" />
        <div>
          <span>Don&apos;t have an account?</span>{' '}
          <CustomLink to={routes.signup()}>Sign up!</CustomLink>
        </div>

        <Button className="login-btn" colorScheme="purple" type="submit">
          Login
        </Button>
      </Form>
    </>
  )
}

export default LoginPage
