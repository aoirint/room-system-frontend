import React from 'react'
import { Redirect } from 'react-router-dom'
import firebase from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface FirebaseAuthProps {
  children?: React.ReactNode
}

function FirebaseAuth (props: FirebaseAuthProps): JSX.Element {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (loading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

  if (error != null) {
    return <div>Error: {error}</div>
  }

  if (user == null) {
    return <Redirect to='/signin' />
  }

  return <div className='FirebaseAuth'>{props.children}</div>
}

export default FirebaseAuth
