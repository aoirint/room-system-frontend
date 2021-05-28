import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'

import { Container } from 'reactstrap'

import firebase from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

import SignInForm from './SignInForm'


function SignIn (props: RouteComponentProps): JSX.Element {
  const [user, authLoading, authError] = useAuthState(firebase.auth())

  const onSignedIn = (): void => {
  }

  if (user != null) {
    props.history.push('/')
  }

  return (
    <div className='SignIn'>
      <Container className='mt-4'>
      <h3>Sign In</h3>
        {authLoading ? (
          <p>
            Loading...
          </p>
        ) : authError != null ? (
          <p>
            Error: {authError}
          </p>
        ) : user != null ? (
          <p>
            (Redirecting) Signed In: {user.uid}
          </p>
        ) : (
          <SignInForm
            onSignedIn={onSignedIn}
          />
        )}
      </Container>
    </div>
  )
}

export default withRouter(SignIn)
