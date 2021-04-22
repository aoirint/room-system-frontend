import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router'
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap'
import { Formik, FormikProps } from 'formik'
import * as Yup from 'yup'
import LoadingOverlay from 'react-loading-overlay'

import firebase from './Firebase'
import { useAuthState } from 'react-firebase-hooks/auth'

interface SignInValues {
  email: string
  password: string
}

function submitSignIn (values: SignInValues): void {
  firebase.auth().signInWithEmailAndPassword(values.email, values.password)
    .then(res => {
    })
    .catch(error => {
      alert(error)
    })
}

function SignInForm (props: FormikProps<SignInValues>): JSX.Element {
  const [, loading] = useAuthState(firebase.auth())

  return (
    <Form onSubmit={props.handleSubmit}>
      <FormGroup>
        <Label for='email'>Email</Label>
        <Input
          type='email'
          name='email'
          id='email'
          value={props.values.email ?? ''}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          invalid={!!(props.touched.email != null && props.errors.email != null)}
        />
        <FormFeedback>
          {props.errors.email ?? ''}
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for='password'>Password</Label>
        <Input
          type='password'
          name='password'
          id='password'
          value={props.values.password}
          onChange={props.handleChange}
          onBlur={props.handleBlur}
          invalid={!!(props.touched.password != null && props.errors.password != null)}
        />
        <FormFeedback>
          {props.errors.password}
        </FormFeedback>
      </FormGroup>

      <Button color='primary' type='submit' disabled={loading}>
        <Spinner size='sm' color='light' hidden={!loading} />
        ログイン
      </Button>

    </Form>
  )
}

function SignIn (props: RouteComponentProps): JSX.Element {
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
    return (
      <div>Error: {error}</div>
    )
  }

  if (user != null) {
    props.history.push('/')
    return (
      <div>Signed In: {user.uid}</div>
    )
  }

  const initialValues: SignInValues = { email: '', password: '' }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values) => submitSignIn(values)}
      validationSchema={
        Yup.object().shape({
          email: Yup.string().email().required(),
          password: Yup.string().required()
        })
      }
    >
      {SignInForm}
    </Formik>
  )
}

export default withRouter(SignIn)
