import React from 'react'
import '../styles/components/comment.css'
import {Link} from "react-router-dom"

function Comment(props) {

    let date = props.comment.created_at.split("T")[0].split("-")

    return (
        <div className='comment'>
            <div className='comment-header'>
                <Link className='comment-author' to={`/profile/${props.comment.user_dto.id}`}>
                    <img className='comment-author-img' src={`http://localhost:9000/avatars/${props.comment.user_dto.image_key}`}/>
                    <span className='comment-author-nick'>{props.comment.user_dto.nickname}</span>
                </Link>
                <span className='comment-created-at'>{date[2]}.{date[1]}.{date[0]}</span>
            </div>
            <p className='comment-description'>
                {props.comment.text}
            </p>
        </div>
    )
}

export default Comment