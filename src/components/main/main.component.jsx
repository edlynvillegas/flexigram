import React from 'react'
import './main.styles.scss'
import { Switch, Route } from 'react-router-dom'
// Components
import Feed from '../content/feed/feed.component'
import Message from '../content/message/message.component'
import Notification from '../content/notification/notification.component'

const Content = () => {
    return (
        <div className="main-content">
            <Switch>
                <Route exact path='/' component={Feed} />
                <Route exact path='/notification' component={Notification} />
                <Route exact path='/messages' component={Message} />
            </Switch>
        </div>
    )
}

export default React.memo(Content);