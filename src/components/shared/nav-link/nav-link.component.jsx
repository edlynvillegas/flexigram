import React from 'react'
import './nav-link.styles.scss'
import { Link, useRouteMatch, useHistory } from 'react-router-dom'

const LinkItem = ({path, name, icon}) => {
    let match = useRouteMatch(path);
    let history = useHistory();
    let styles = 'link-item';
    if (match?.isExact) styles += ' active'
    
    return (
        <li className={styles} onClick={() => history.push(path)}>
            {icon ? icon : null}
            <Link to={path}>{name}</Link>
        </li>
    )
}

export default React.memo(LinkItem)