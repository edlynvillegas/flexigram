import React from 'react'
import './dialog-input.styles.scss'

const DialogInput = ({ placeholder, captionChange }) => {
    console.log('DialogInput rendered!')
    return (
        <div className="dialog-form-group">
            <input type="text"
                placeholder={placeholder}
                onChange={(e) => captionChange({type: 'caption', value: e.target.value})} />
        </div>
    )
}

export default React.memo(DialogInput);