import React from 'react'
import './story.styles.scss'
// SVGs
import { ReactComponent as AvatarSVG } from '../../../assets/images/illustrations/female.svg'

const StoryTemplate = () => {
    // const [isHover, setHover]
    return (
        <div className="story-template">
            <AvatarSVG title="Hello!" />
        </div>
    )
}
export default React.memo(StoryTemplate);