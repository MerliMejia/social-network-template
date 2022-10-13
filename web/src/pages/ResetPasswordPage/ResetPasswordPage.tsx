import { useEffect, useRef, useState } from 'react'

import { Button, Heading } from '@chakra-ui/react'

import { useAuth } from '@redwoodjs/auth'
import { Form, Label, PasswordField, FieldError } from '@redwoodjs/forms'
import { navigate, routes } from '@redwoodjs/router'
import { MetaTags } from '@redwoodjs/web'
import { toast, Toaster } from '@redwoodjs/web/toast'

import './ResetPasswordPage.scss'

const ResetPasswordPage = ({ resetToken }) => {
  const { isAuthenticated, reauthenticate, validateResetToken, resetPassword } =
    useAuth()
  const [enabled, setEnabled] = useState(true)

  useEffect(() => {
    if (isAuthenticated) {
      navigate(routes.profile())
    }
  }, [isAuthenticated])

  useEffect(() => {
    const validateToken = async () => {
      const response = await validateResetToken(resetToken)
      if (response.error) {
        setEnabled(false)
        toast.error(response.error)
      } else {
        setEnabled(true)
      }
    }
    validateToken()
  }, [])

  const passwordRef = useRef<HTMLInputElement>()
  useEffect(() => {
    passwordRef.current.focus()
  }, [])

  const onSubmit = async (data) => {
    const response = await resetPassword({
      resetToken,
      password: data.password,
    })

    if (response.error) {
      toast.error(response.error)
    } else {
      toast.success('Password changed!')
      await reauthenticate()
      navigate(routes.login())
    }
  }

  return (
    <>
      <MetaTags title="Reset Password" />

      <Heading as={'h2'} size="md">
        Reset Password
      </Heading>

      <Toaster toastOptions={{ className: 'rw-toast', duration: 6000 }} />

      <Form onSubmit={onSubmit}>
        <div className="text-left">
          <Label
            name="password"
            className="rw-label"
            errorClassName="rw-label rw-label-error"
          >
            New Password
          </Label>
          <PasswordField
            name="password"
            autoComplete="new-password"
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            disabled={!enabled}
            ref={passwordRef}
            validation={{
              required: {
                value: true,
                message: 'Password is required',
              },
            }}
          />

          <FieldError name="password" className="rw-field-error" />
        </div>

        <Button
          className="reset-password-btn"
          colorScheme="purple"
          type="submit"
          disabled={!enabled}
        >
          Submit
        </Button>
      </Form>
    </>
  )
}

export default ResetPasswordPage
