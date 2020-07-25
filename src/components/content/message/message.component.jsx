import React from 'react'
import './message.styles.scss'

const Message = () => {
    return (
        <div className="message-container">
            <h1>Messages</h1>
        </div>
    )
}

export default React.memo(Message);