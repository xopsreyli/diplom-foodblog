import React from 'react'
import '../styles/components/profile-stats.css'

function ProfileStats(props) {
    return (
        <div className='profile-stat'>
            <span className='profile-stat-number'>{props.number}</span>
            <span className='profile-stat-text'>{props.text}</span>
        </div>
    )
}

export default ProfileStats