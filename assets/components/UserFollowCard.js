import React from 'react'
import '../styles/components/user-follow-card.css'
import {Link} from "react-router-dom"

function UserFollowCard(props) {
    return (
        <Link className='follow-card' to={`/profile/${props.user.id}`}>
            <img className='follow-card-img' src={`http://localhost:9000/avatars/${props.user.image_key}`} alt=""/>
            <span className='follow-card-name'>{props.user.nickname}</span>
        </Link>
    )
}

export default UserFollowCard