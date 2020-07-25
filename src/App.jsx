import React, { useState, useContext, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom'
import Cookies from 'universal-cookie';
import './App.scss';
// Pages
import { SignInUp } from './pages/sign-in-up/sign-in-up.component'
import Home from './pages/home/home.component'
import { LoadingScreen } from './pages/loading-screen/loading-screen.component'
// Providers
import { AuthContext } from './providers/AuthProvider'
import UserProvider from './providers/UserProvider'
// Services
import { verifyToken } from './services/auth.services'

function App() {
  const [isLoading, setLoading] = useState(true);
  const cookies = new Cookies();
  const { authUser, setAuth } = useContext(AuthContext)

  useEffect(() => {
    let token = cookies.get('auth_token')
    if (token) {
      console.log('verifying token')
      verifyToken(token).then(res => {
          if (res.data.auth) {
            if (res.data.token) { // Generated new token!
              setAuth({type: 'save', token: res.data.token})
            } else {
              setAuth({type: 'save'})
            }
          }
        })
        .catch(error => {
          console.log(error.message)
        })
    } else {
        console.log('login first')
    }
  // eslint-disable-next-line
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 1000);
  }, [authUser])
  
  return (
    <>
      {
        isLoading ?
        <LoadingScreen /> :
        <Switch>
          <PrivateRoute path='/'>
            <UserProvider>
              <Home />
            </UserProvider>
          </PrivateRoute>
          <Route exact path='/' component={SignInUp} />
        </Switch>
      }
    </>
  );
}

function PrivateRoute({ children, ...rest }) {
  const {authUser} = useContext(AuthContext)
  return (
    <Route
      {...rest}
      render={({ location }) =>
      authUser ? (
          children
        ) : (
          <SignInUp />
        )
      }
    />
  );
}

export default App;
