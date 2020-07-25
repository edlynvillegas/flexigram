import React, { createContext, useReducer, useEffect } from 'react'
import Cookies from 'universal-cookie';

export const UserContext = createContext();
const cookies = new Cookies();

const userInfoReducer = (state, action) => {
    switch(action.type) {
        case 'save':
            return action.info
        case 'remove':
            return null
        default:
            return null
    }
}

const UserProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useReducer(userInfoReducer, null)
    
    const oldCookies = (cookie) => {
        if (!cookie.value) {
            setUserInfo({ type: 'remove' })
        }
    }
    
    useEffect(() => {
        cookies.addChangeListener(oldCookies)
        return () => cookies.removeChangeListener(oldCookies)
    }, [])

    return (
        <UserContext.Provider value={{userInfo, setUserInfo}}>
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;