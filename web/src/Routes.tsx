import { Router, Route, Private, Set } from '@redwoodjs/router'

import AuthLayout from './layouts/AuthLayout/AuthLayout'
import ProfilePage from './pages/ProfilePage/ProfilePage'

const Routes = () => {
  return (
    <Router>
      <Set wrap={AuthLayout}>
        <Route path="/login" page={LoginPage} name="login" />
        <Route path="/signup" page={SignupPage} name="signup" />
        <Route path="/forgot-password" page={ForgotPasswordPage} name="forgotPassword" />
        <Route path="/reset-password" page={ResetPasswordPage} name="resetPassword" />
      </Set>

      <Private unauthenticated="login">
        <Route path="/profile" page={ProfilePage} name="profile" />
        <Route path="/" page={HomePage} name="home" />
      </Private>
      <Route notfound page={NotFoundPage} />
    </Router>
  )
}

export default Routes
