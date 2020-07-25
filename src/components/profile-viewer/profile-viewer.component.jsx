import React from 'react'
import './profile-viewer.styles.scss'

const ProfileViewer = ({ fullname, username }) => {
    return (
        <div className="profile-viewer">
            <div className="viewer-upper">
                {/* <figure></figure> */}
                <p>{fullname ? fullname : ''}</p>
                <p>@ {username ? username : ''}</p>
            </div>
        </div>
    )
}

export default React.memo(ProfileViewer);