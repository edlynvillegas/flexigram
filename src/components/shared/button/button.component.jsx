import React from 'react'
import './button.styles.scss'

const Button = ({type, sort, text, handleClick, disabled, icon, rounded}) => {
    let styles = 'insta-button'
    const hasIconStyle = { justifyContent: 'space-between' }
    if (rounded) styles += ' rounded'

    if (sort) styles += ' '+sort
    else styles += ' primary'

    if (!type) type = 'button'

    return (
        <button
            style={icon ? hasIconStyle : null}
            className={styles}
            type={type}
            onClick={handleClick}
            disabled={disabled}>
            { icon ? icon : null }
            <p>{text}</p>
        </button>
    )
}

export default React.memo(Button);