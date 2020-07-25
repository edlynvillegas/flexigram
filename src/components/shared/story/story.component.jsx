import React, { useState } from 'react'
import './story.styles.scss'
// SVGs
import { ReactComponent as PlusSVG } from '../../../assets/images/icons/plus.svg'

const UserStory = ({thisUser, defaultAvatar, id, name, image}) => {
    const [isSeen, setSeen] = useState(false)
    let styles = 'user-story'
    if (isSeen) styles += ' is-seen'

    const viewStory = () => {
        setTimeout(() => {
            setSeen(!isSeen)
        }, 1000);
    }
    
    return (
        <div className={styles} onClick={() => viewStory()}>
            <div className="story-content">
                <div className="thumbnail">
                    
                </div>
                { thisUser ? <PlusSVG /> : null }
            </div>
        </div>
    )
}

export default React.memo(UserStory);