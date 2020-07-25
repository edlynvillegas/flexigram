import React, { useState } from 'react'
import './form-input.styles.scss'
// Assets
import { ReactComponent as EyeSVG } from '../../../assets/images/icons/eye.svg'

const FormInput = React.memo(({field, form: { errors, isSubmitting }, ...props}) => {
    const [isFocus, setFocus] = useState(false);
    const [isHidden, setVisible] = useState(props.type === 'password' ? true : false);
    const label = field.name.toUpperCase().split('_').join(' ')
    let className = 'form-group';
    if (isFocus) className += ' is-focus'
    if (errors[field.name]) className += ' is-error'

    console.log('--> FormInput')

    return (
        <div className={className}>
            <label htmlFor={field.name}>{label}</label>
            <input id={field.name} {...field} {...props}
                type={isHidden ? 'password' : 'text'}
                autoComplete="off" disabled={isSubmitting}
                onFocus={() => setFocus(true)} onBlur={() => setFocus(false)}>
            </input>
            {
                props.type === 'password' && <EyeSVG className={isHidden ? 'closed' : null} onClick={() => setVisible(!isHidden)} />
            }
            {
                <span className="input-error">{errors[field.name]}</span>
            }
        </div>
    )
})

export default FormInput