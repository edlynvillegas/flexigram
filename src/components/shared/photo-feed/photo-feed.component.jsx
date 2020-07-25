import React from 'react'
import './photo-feed.styles.scss'

const PhotoFeed = ({ id, username, image }) => {
    return (
        <div className="photo-feed-container">
            <img src={image} alt={`${username}'s Post`} />
        </div>
    )
}

export default React.memo(PhotoFeed);