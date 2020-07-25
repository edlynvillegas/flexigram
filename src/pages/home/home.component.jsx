import React, { useContext, useState, useEffect } from 'react'
import './home.styles.scss'
// Components
import Sidebar from '../../components/sidebar/sidebar.component'
import Content from '../../components/main/main.component'
import Dialog from '../../components/shared/dialog/dialog.component'
// Providers
import { UserContext } from '../../providers/UserProvider'
// Services
import { getUserInfo } from '../../services/user.services'

const Home = () => {
    const { setUserInfo } = useContext(UserContext)
    const [isDialog, setDialog] = useState(false)
    console.log('HomeHomeHome')
    useEffect(() => {
        getUserInfo().then(doc => {
            setUserInfo({type: 'save', info: doc.data.info})
        }).catch(error => {
            console.log(error.message)
        })
    // eslint-disable-next-line
    }, [])
    return (
        <>
            <main>
                <Sidebar />
                <Content />
            </main>
            {
                isDialog ?
                <Dialog size='lg' handleClose={() => setDialog(false)}>
                    <p>Comple infooo</p>
                </Dialog> :
                null
            }
        </>
    )
}

export default React.memo(Home)