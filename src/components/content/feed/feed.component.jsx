import React, { useState } from 'react'
import './feed.styles.scss'
// SVG
import { ReactComponent as FriendsSVG } from '../../../assets/images/illustrations/friends_online.svg'
// Components
import Header from '../../header/header.component'
import Stories from '../../stories/stories.component'
import EmptyTemplate from '../../template/empty/empty.template'
import PhotoFeed from '../../shared/photo-feed/photo-feed.component'
import Dialog from '../../shared/dialog/dialog.component'

const Feed = () => {
    const [isDialog, setDialog] = useState(false)
    const feeds = [
        // {
        //     id: '001',
        //     username: 'johndoe18',
        //     image: '../../../assets/images/stocks/https___www.lifeofpix.com_wp-content_uploads_2020_06_IMG_0637.jpg'
        // },
        // {
        //     id: '002',
        //     username: 'maryjane_',
        //     image: '../../../assets/images/stocks/https___www.lifeofpix.com_wp-content_uploads_2020_06_IMG_9592.jpg'
        // }
    ]
    return (
        <div className="feed-container">
            <Header />
            <Stories />

            <h1>Feed</h1>
            <div className="feed-content">
                {
                    feeds.length > 0 ?
                    feeds.map(feed => (
                        <PhotoFeed key={feed.id} {...feed} />
                    )) :
                    <EmptyTemplate title='Follow someone you know, or someone who inspires you.' illustration={<FriendsSVG />} />
                }
            </div>
            <button onClick={() => setDialog(true)}>Open Dialog</button>
            {
                isDialog ?
                <Dialog size='lg' handleClose={() => setDialog(false)}>
                    <p>Turn On Notifications</p>
                </Dialog> :
                null
            }
        </div>
    )
}

export default React.memo(Feed);