import React from 'react'
import './navigation.styles.scss'
// Components
import LinkItem from '../shared/nav-link/nav-link.component'
// SVGs
import { ReactComponent as FeedSVG } from '../../assets/images/icons/feed.svg'
import { ReactComponent as BellSVG } from '../../assets/images/icons/bell.svg'
import { ReactComponent as MailSVG } from '../../assets/images/icons/mail.svg'
import { ReactComponent as CogSVG } from '../../assets/images/icons/cog.svg'
// import { ReactComponent as LogoutSVG } from '../../assets/images/icons/logout.svg'

const Navigations = () => {
    const routes = [
        { path: "/", name: 'Feed', icon: <FeedSVG /> },
        { path: "/notification", name: 'Notifications', icon: <BellSVG /> },
        { path: "/messages", name: 'Messages', icon: <MailSVG />  },
        { path: "/settings", name: 'Settings', icon: <CogSVG />  }
      ];
    return (
    <ul className="navigation">
        { routes.map(route => <LinkItem key={route.path} {...route} />) }
    </ul>
    )
}

export default React.memo(Navigations);