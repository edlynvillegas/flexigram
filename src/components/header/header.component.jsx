import React, { useState } from 'react'
import './header.styles.scss'
// Components
import SearchInput from '../search-input/search-input.component'
import Button from '../shared/button/button.component'
import AddPhoto from '../../components/dialogs/add-photo/add-photo.component'
// SVGs
import { ReactComponent as ImageSVG } from '../../assets/images/icons/image.svg'

const Header = () => {
    const [isDialog, setDialog] = useState(false)
    console.log('header rendered!')
    return (
        <>
            <div className="feed-header">
                <SearchInput />
                <Button type='button' text='Add Photo' icon={<ImageSVG />} handleClick={() => setDialog(true)} />
            </div>
            {
                isDialog ?
                <AddPhoto setShow={setDialog} /> :
                null
            }
        </>
    )
}

export default React.memo(Header);