import React from 'react'
import './loading-screen.styles.scss'
// SVGs
import { ReactComponent as TreeSwingSVG } from '../../assets/images/illustrations/tree_swing.svg'

export const LoadingScreen = () => (
    <div className="loading-screen">
        <span>
            <TreeSwingSVG />
            <p>Loading.. Please wait</p>
        </span>
    </div>
)