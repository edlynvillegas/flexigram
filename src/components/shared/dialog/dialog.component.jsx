import React from 'react'
import ReactDOM from 'react-dom';
import './dialog.styles.scss'
// Components
import Button from '../button/button.component'

const Dialog = ({ headerText, handleClose, handleSubmit, closeText, submitText, size, children  }) => {
    let dialogClass = 'dialog-container'
    if (size) dialogClass += ' ' + size
    return ReactDOM.createPortal(
        <div className="dialog-backdrop">
            <div className={dialogClass}>
                {
                    headerText ?
                    <div className="dialog-header">
                        <p>{headerText}</p>
                    </div> :
                    null
                }
                <div className="dialog-body">
                    {children}
                </div>
                <div className="dialog-footer">
                    {
                        handleClose ? 
                        // <button onClick={() => handleClose()}>{closeText ? closeText : 'Close'}</button> :
                        <Button sort="cancel" handleClick={handleClose} text={closeText ? closeText : 'Close'} /> :
                        null
                    }
                    {
                        handleSubmit ? 
                        <Button handleClick={handleSubmit} text={submitText ? submitText : 'Submit'} /> :
                        null
                    }
                </div>
            </div>
        </div>,
        document.body
    )
}

export default React.memo(Dialog);