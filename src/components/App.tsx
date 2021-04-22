import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import FirebaseAuth from './FirebaseAuth'
import SignIn from './SignIn'
import Home from './Home'
import './App.css'

function App (): JSX.Element {
  return (
    <Router>
      <Switch>
        <Route exact path='/signin' component={SignIn} />

        <FirebaseAuth>
          <Switch>
            <Route exact path='/' component={Home} />
          </Switch>
        </FirebaseAuth>

      </Switch>
    </Router>
  )
}

export default App
