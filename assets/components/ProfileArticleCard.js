import React from 'react'
import {Link} from "react-router-dom"
import '../styles/components/profile-article-card.css'

function ProfileArticleCard(props) {
    return (
        <Link className='profile-article-card' to='/'>
            <div className='pa-card-image-block'>
                <img className='pa-card-image' src={`http://localhost:9000/articles/${props.image}`} alt=""/>
            </div>
            <div className='pa-card-title-block'>
                <span className='pa-card-title'>{props.title}</span>
            </div>
        </Link>
    )
}

export default ProfileArticleCard