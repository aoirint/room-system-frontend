import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import LoadingOverlay from 'react-loading-overlay'
import firebase from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface FirebaseAuthProps {
  children?: React.ReactNode
}

function FirebaseAuth (props: FirebaseAuthProps) {
  const [user, loading, error] = useAuthState(firebase.auth())

  if (loading) {
    return (
      <LoadingOverlay
        active
        spinner
        text='Loading...'
      />
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
