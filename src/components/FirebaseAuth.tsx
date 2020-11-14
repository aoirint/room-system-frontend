import React from 'react';
import { Redirect } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import firebase from './Firebase';

interface State {
  isLoading: boolean;
  signedIn: boolean;
}

class FirebaseAuth extends React.Component<{}, State> {
  state: State = {
    isLoading: true,
    signedIn: false,
  }

  _isMounted: boolean = false;

  componentDidMount() {
    this._isMounted = true;

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            signedIn: true,
          });
        }
      }
      else {
        if (this._isMounted) {
          this.setState({
            isLoading: false,
            signedIn: false,
          });
        }
      }
    });
  }
  
  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    if (this.state.isLoading) {
      return (
        <LoadingOverlay
          active={true}
          spinner
          text='Loading...'
        >
        </LoadingOverlay>
      )
    }

    if (this.state.signedIn) {
      return this.props.children;
    } else {
      return <Redirect to="/signin" />
    }
  }
}

export default FirebaseAuth;
