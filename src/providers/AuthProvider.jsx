import React, { createContext, useReducer, useEffect } from 'react'
import Cookies from 'universal-cookie';

export const AuthContext = createContext();
const cookies = new Cookies();

const authUserReducer = (state, action) => {
    if (!action) return false;

    switch(action.type) {
        case 'save':
            if (action.token) {
                cookies.set('auth_token', action.token, { path: '/' })
            }
            return true
        case 'remove':
            // remove cookies: token
            cookies.remove('auth_token')
            return false
        default:
            return false
    }
}


const AuthProvider = ({ children }) => {
    const [authUser, setAuth] = useReducer(authUserReducer, false)

    const newCookies = (cookie) => {
        console.log('NEW COOKIE ADDED:', cookie)
        if (cookie.value) {
            setAuth({ type: 'save' })
        } else {
            setAuth()
        }
    }

    useEffect(() => {
        cookies.addChangeListener(newCookies)
        return () => cookies.removeChangeListener(newCookies)
    }, [])
    
    return (
        <AuthContext.Provider value={{authUser, setAuth}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;