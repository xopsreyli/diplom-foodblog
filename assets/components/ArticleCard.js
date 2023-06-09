import React from 'react'
import '../styles/components/article-card.css'
import {Link} from "react-router-dom"

function ArticleCard(props) {
    let date = props.article.created_at.split("T")[0].split("-")

    return (
        <Link className='article-card' to={`/article/${props.article.id}`}>
            <div className='article-card-header'>
                <img className='article-card-author-img' src={`http://localhost:9000/avatars/${props.article.user.image_key}`}/>
                <span className='article-card-author-nickname'>{props.article.user.nickname}</span>
            </div>
            <div className='article-card-content'>
                <img className='article-card-img' src={`http://localhost:9000/articles/${props.article.image_key}`}/>
            </div>
            <p className='article-card-title'>{props.article.title}</p>
            <div className='article-card-footer'>
                <div className='article-card-likes-block'>
                    <svg width="24" height="24" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 35C19.7807 35.0013 19.5632 34.9592 19.3602 34.8763C19.1571 34.7933 18.9724 34.6711 18.8167 34.5167L5.86666 21.55C4.24226 19.9086 3.3311 17.6926 3.3311 15.3833C3.3311 13.0741 4.24226 10.858 5.86666 9.21666C7.50377 7.58418 9.72138 6.66745 12.0333 6.66745C14.3453 6.66745 16.5629 7.58418 18.2 9.21666L20 11.0167L21.8 9.21666C23.4371 7.58418 25.6547 6.66745 27.9667 6.66745C30.2786 6.66745 32.4962 7.58418 34.1333 9.21666C35.7577 10.858 36.6689 13.0741 36.6689 15.3833C36.6689 17.6926 35.7577 19.9086 34.1333 21.55L21.1833 34.5167C21.0276 34.6711 20.8429 34.7933 20.6398 34.8763C20.4368 34.9592 20.2193 35.0013 20 35Z" fill="#9381FF" stroke='#9381FF' strokeWidth='2'/>
                    </svg>
                    <span className='article-card-likes'>{props.article.likes}</span>
                </div>
                <span>{date[2]}.{date[1]}.{date[0]}</span>
            </div>
        </Link>
    )
}

export default ArticleCard