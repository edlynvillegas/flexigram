import React from 'react'
import './empty.styles.scss'

const EmptyTemplate = ({title, illustration}) => (
    <div className="empty-template">
        {illustration}
        <p>{title}</p>
    </div>
)

export default React.memo(EmptyTemplate);