import React from 'react'
import './search-input.styles.scss'
// SVGs
import { ReactComponent as SearchSVG } from '../../assets/images/icons/search.svg'

const SearchInput = () => {
    console.log('search bar rendered!')
    return (
        <div className="search-group">
            <SearchSVG />
            <input type="text" name ="search" placeholder="Search" autoComplete="off" />
        </div>
    )
}

export default React.memo(SearchInput)