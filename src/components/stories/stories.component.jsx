import React from 'react'
import './stories.styles.scss'
// Components
import UserStory from '../shared/story/story.component'
import StoryTemplate from '../template/story/story.template'

const Stories = () => {
    const user = { id: '2dd12', name: 'John Doe', image: 'user.jpg' }
    const stories = [
        // { id: '001', name: 'John Doe', image: 'user.jpg' },
        { id: '002', name: 'Mary Williams', image: 'user.jpg' },
        { id: '003', name: 'Will Smith', image: 'user.jpg' }
    ]
    return (
        <div className="stories-container">
            <p>Stories</p>
            <div className="stories-content">
                <UserStory {...user} thisUser={true} />
                { stories.map(user => <UserStory key={user.id} {...user} />) }
                { stories.length < 3 ? <StoryTemplate /> : null }
            </div>
        </div>
    )
}

export default React.memo(Stories);