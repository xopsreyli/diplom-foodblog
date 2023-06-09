import React from 'react'
import '../styles/components/profile-stats.css'
import {Link} from "react-router-dom"

function ProfileStats(props) {
    return (
        <Link className='profile-stat' to={props.to}>
            <span className='profile-stat-number'>{props.number}</span>
            <span className='profile-stat-text'>{props.text}</span>
        </Link>
    )
}

export default ProfileStats