import React from 'react'
import '../styles/components/user-follow-card.css'
import {Link} from "react-router-dom"

function UserFollowCard(props) {
    function resolveAvatar() {
        if (props.user.image_key) {
            return (
                <img className='follow-card-img' src={`http://localhost:9000/avatars/${props.user.image_key}`}/>
            )
        } else {
            return (
                <svg width="40" height="40" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M50 0C36.25 0 25 14 25 31.25C25 48.5 36.25 62.5 50 62.5C63.75 62.5 75 48.5 75 31.25C75 14 63.75 0 50 0ZM23.875 62.5C10.625 63.125 0 74 0 87.5V100H100V87.5C100 74 89.5 63.125 76.125 62.5C69.375 70.125 60.125 75 50 75C39.875 75 30.625 70.125 23.875 62.5Z" fill="#000505"/>
                </svg>
            )
        }
    }

    return (
        <Link className='follow-card' to={`/profile/${props.user.id}`}>
            {resolveAvatar()}
            <span className='follow-card-name'>{props.user.nickname}</span>
        </Link>
    )
}

export default UserFollowCard