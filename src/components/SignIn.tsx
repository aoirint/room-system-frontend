import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router';
import { Button, Form, FormGroup, Label, Input, FormFeedback, Spinner } from 'reactstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

import firebase from './Firebase';

interface Props extends RouteComponentProps {
}

interface State {
  isLoading: boolean;
}

interface SignInInfo {
  email: string;
  password: string;
}

class SignIn extends React.Component<Props, State> {
  state: State = {
    isLoading: true,
  }

  _isMounted: boolean = false;

  handleOnSubmit(values: SignInInfo) {
    if (this._isMounted) this.setState({isLoading: true});

    firebase.auth().signInWithEmailAndPassword(values.email, values.password)
      .then(res => {
        this.props.history.push('/');
        if (this._isMounted) this.setState({isLoading: false});
      })
      .catch(error => {
        if (this._isMounted) this.setState({isLoading: false});
        alert(error);
      });
  }

  componentDidMount() {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.setState({
          isLoading: false,
        });
      }
      else {
        this.setState({
          isLoading: false,
        });
      }
    });
  }
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const initialValues: SignInInfo = { email: '', password: '' };

    return (
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => this.handleOnSubmit(values)}
        validationSchema={
          Yup.object().shape({
            email: Yup.string().email().required(),
            password: Yup.string().required(),
          })
        }
      >
        {
          ({handleSubmit, handleChange, handleBlur, values, errors, touched }) => (
            <Form onSubmit={handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.email && errors.email ? true : false}
                />
                <FormFeedback>
                  {errors.email}
                </FormFeedback>
              </FormGroup>

              <FormGroup>
                <Label for="password">Password</Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  invalid={touched.password && errors.password ? true : false}
                />
                <FormFeedback>
                  {errors.password}
                </FormFeedback>
              </FormGroup>
              
              <Button color="primary" type="submit" disabled={this.state.isLoading}>
                <Spinner size="sm" color="light" hidden={!this.state.isLoading} />
                ログイン
              </Button>

            </Form>
          )
        }
      </Formik>
    );
  }
}

export default withRouter(SignIn);
