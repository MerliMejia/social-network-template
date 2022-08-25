import { useRef } from 'react'
import { useEffect } from 'react'

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
import './SignupPage.scss'

const SignupPage = () => {
  const { isAuthenticated, signUp } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  // focus on email box on page load
  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await signUp({ ...data })

    if (response.message) {
      toast(response.message)
    } else if (response.error) {
      toast.error(response.error)
    } else {
      // user is signed in automatically
      toast.success('Welcome!')
    }
  }

  return (
    <>
      <MetaTags title="Signup" />

      <Heading as={'h2'} size="md">
        Signup
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
          name="name"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Name
        </Label>
        <TextField
          name="name"
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{
            required: {
              value: true,
              message: 'Name is required',
            },
          }}
        />
        <FieldError name="name" className="rw-field-error" />

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

        <FieldError name="password" className="rw-field-error" />

        <div className="signup-link">
          <span>Don&apos;t have an account?</span>{' '}
          <CustomLink to={routes.login()}>Log in!</CustomLink>
        </div>

        <Button className="signup-btn" colorScheme="purple" type="submit">
          Login
        </Button>
      </Form>
    </>
  )
}

export default SignupPage
