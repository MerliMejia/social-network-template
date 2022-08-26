import { useEffect, useRef } from 'react'

import { Button, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, TextField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import './ForgotPasswordPage.scss'

const ForgotPasswordPage = () => {
  const { isAuthenticated, forgotPassword } = useAuth()

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.home())
    }
  }, [isAuthenticated])

  const usernameRef = useRef<HTMLInputElement>()
  useEffect(() => {
    usernameRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await forgotPassword(data.username)

    if (response.error) {
      toast.error(response.error)
    } else {
      // The function `forgotPassword.handler` in api/src/functions/auth.js has
      // been invoked, let the user know how to get the link to reset their
      // password (sent in email, perhaps?)
      toast.success(
        'A link to reset your password was sent to ' + response.email
      )
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Forgot Password" />
      <Heading as={'h2'} size="md">
        Forgot Password
      </Heading>

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Form onSubmit={onSubmit}>
        <div className="text-left">
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
              required: true,
            }}
          />

          <FieldError name="username" className="rw-field-error" />
        </div>

        <Button
          className="forgot-password-btn"
          colorScheme="purple"
          type="submit"
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ForgotPasswordPage
