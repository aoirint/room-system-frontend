import React from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap'

import firebase from './Firebase'


interface SignInFormProps {
  onSignedIn: VoidFunction
}

export interface SignInFormValues {
  email: string
  password: string
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
  password: Yup.string().required()
})

function SignInForm(props: SignInFormProps) {
  const { register, handleSubmit, formState: { isSubmitting, touchedFields, errors } } = useForm<SignInFormValues>({
    resolver: yupResolver(validationSchema)
  })

  const onSubmit = (values: SignInFormValues): void => {
    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        props.onSignedIn()
      })
      .catch(error => {
        alert(error)
      })
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label for='email'>Email</Label>
        <Input
          type='email'
          defaultValue=''
          invalid={!!(touchedFields.email != null && errors.email != null)}
          {...register('email', { required: true })}
        />
        <FormFeedback>
          {errors.email?.message ?? ''}
        </FormFeedback>
      </FormGroup>

      <FormGroup>
        <Label for='password'>Password</Label>
        <Input
          type='password'
          defaultValue=''
          invalid={!!(touchedFields.password != null && errors.password != null)}
          {...register('password', { required: true })}
        />
        <FormFeedback>
          {errors?.password?.message ?? ''}
        </FormFeedback>
      </FormGroup>

      <Spinner size='sm' color='light' hidden={!isSubmitting} />

      <Button color='primary' type='submit' disabled={isSubmitting}>
        Login
      </Button>

    </Form>
  )
}

export default SignInForm
