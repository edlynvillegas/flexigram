import React, { useState } from 'react'
import './sign-in-up.styles.scss'
// SVGs
import { ReactComponent as LoginSVG } from '../../assets/images/illustrations/sign_in.svg'
import { ReactComponent as EnterSVG } from '../../assets/images/illustrations/enter.svg'
// Components
import CustomTab from '../../components/shared/tab/custom-tab.component'
import { SignUpForm } from '../../components/form/sign-up/sign-up.component'
import { SignInForm } from '../../components/form/sign-in/sign-in.component'

export const SignInUp = () => {
    let [signMode, setMode] = useState('sign-up')

    let modes = [{value: 'sign-in', view: 'Sign In'},{value: 'sign-up', view: 'Sign Up'}]
    const illustrations = {
        'sign-up': {
            title: <h2>You know what? Don't mind them. <span>Flex</span> the real you!</h2>,
            width: '65',
            svg: <EnterSVG/>
        },
        'sign-in': {
            title: <h2>Welcome back to <span>flexigram</span>, where have you been? The world misses you!</h2>,
            width: '85',
            svg: <LoginSVG/>
        }
    }

    return (
        <div className="container">
            <div className="content">
                <div className="left-container">
                    { illustrations[signMode].title }
                    <div className="svg-container" style={{ width: `${illustrations[signMode].width}%` }}>
                        { illustrations[signMode].svg }
                    </div>
                </div>
                <div className="right-container">
                    <CustomTab tabs={modes} defaultVal={signMode} handleChange={setMode} />
                    <div className="form-container">
                        <div className="form-content">
                            {
                                signMode === 'sign-up' ? <SignUpForm modeSetter={setMode} /> : <SignInForm modeSetter={setMode} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}