import React, {useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import Header from "../components/Header"
import '../styles/pages/article.css'
import moment from "moment";
import 'moment/locale/ru'

function ArticlePage() {
    let {id} = useParams()
    const [user, setUser] = useState({})
    const [article, setArticle] = useState({})

    useEffect(() => {
        fetch(`/api/article?id=${id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setArticle(data)
            })

        fetch(`/api/user`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setUser(data)
            })
    }, [])

    moment.locale('ru')

    console.log(article)

    if (Object.keys(article).length === 0) {
        return
    }

    return (
        <>
            <Header />
            <div className='main'>
                <div className='article-block'>
                    <div className='article-block-left'>
                        <div className='article-block-left-header'>
                            <Link className='article-author' to={`/profile/${article.user.id}`}>
                                <img className='article-author-img' src={`http://localhost:9000/avatars/${article.user.image_key}`}/>
                                <span className='article-author-nick'>{article.user.nickname}</span>
                            </Link>
                            <span className='article-created-at'>{moment(article.created_at).fromNow()}</span>
                        </div>
                        <img className='article-img' src={`http://localhost:9000/articles/${article.image_key}`}/>
                    </div>
                    <div className='article-block-right'>
                        <h1 className='article-title'>{article.title}</h1>
                        <p className='article-content'>{article.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArticlePage