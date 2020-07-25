import React, { useState, useEffect } from 'react';
import './custom-tab.styles.scss';

const CustomTab = ({tabs, defaultVal, handleChange}) => {
    let [activeTab, setTab] = useState(tabs[0].value)

    useEffect(() => {
        setTab(defaultVal)
    }, [defaultVal])

    function onTabChange(val) {
        setTab(val)
        handleChange(val)
    }

    return (
        <div className="insta-tab">
            {
                tabs.map(tab => (
                    <button key={tab.value}
                        className={activeTab === tab.value ? 'active' : ''}
                        onClick={() => onTabChange(tab.value)}>{tab.view}</button>
                ))
            }
        </div>
    )
}

export default React.memo(CustomTab)