import React, { useContext } from 'react'
import './sidebar.styles.scss'
import { Link } from 'react-router-dom'
// Components
import Navigations from '../navigation/navigation.component'
import ProfileViewer from '../profile-viewer/profile-viewer.component'
// Providers
import { AuthContext } from '../../providers/AuthProvider'
import { UserContext } from '../../providers/UserProvider'
// Services
import { logOutUser } from '../../services/auth.services'

const Sidebar = () => {
    const { setAuth } = useContext(AuthContext)
    const { setUserInfo, userInfo } = useContext(UserContext)
    
    const logout = () => {
        logOutUser()
            .then(res => {
                console.log(res)
                setUserInfo({type: 'remove'})
                setAuth({type: 'remove'})
            })
    }

    return (
        <aside>
            <div className="logo-container">
                <Link to='/'>Flexigram</Link>
                <ProfileViewer {...userInfo} />
            </div>
            <Navigations />
            <button onClick={() => logout()}>Logout</button>
        </aside>
    )
}

export default React.memo(Sidebar);