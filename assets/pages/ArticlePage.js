import React, {useEffect, useState} from 'react'
import {Link, useNavigate, useParams} from "react-router-dom"
import Header from "../components/Header"
import '../styles/pages/article.css'
import moment from "moment"
import 'moment/locale/ru'
import Button from "../components/Button"
import '../styles/pages/forms.css'
import Comment from "../components/Comment"
import Footer from "../components/Footer"

function ArticlePage() {
    let {id} = useParams()
    const navigate = useNavigate()
    const [user, setUser] = useState({})
    const [article, setArticle] = useState({})
    const [commentLength, setCommentLength] = useState(0)
    const [commentValue, setCommentValue] = useState('')
    const [isLiked, setIsLiked] = useState(false)
    const [confirmDelete, setConfirmDelete] = useState('none')

    useEffect(() => {
        getArticle()

        fetch(`/api/user/article/liked?id=${id}`)
            .then(response => {
                return response.json()
            })
            .then(data => {
                setIsLiked(data.is_liked)
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

    async function getArticle() {
        const response = await fetch(`/api/article?id=${id}`)
            .then((response) => {
                if (404 === response.status) {
                    return navigate('/404')
                }
                return response.json()
            })
            .then((data) => {
                setArticle(data)
            })

        // if (404 === response.status) {
        //     navigate('/404')
        // }
    }

    async function addComment(e) {
        e.preventDefault()
        const response = await fetch('/api/comment', {
            method: 'POST',
            body: JSON.stringify({
                text: commentValue,
                article_id: article.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await response.json()

        getArticle()
        setCommentValue('')
    }

    async function like() {
        const response = await fetch('/api/user/article/like', {
            method: 'POST',
            body: JSON.stringify({
                id: article.id
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        await response.json()

        getArticle()
        setIsLiked(!isLiked)
    }

    function likeButton() {
        if (isLiked) {
            return (
                <svg className='like-svg-active' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={like}>
                    <path d="M20 35C19.7807 35.0013 19.5632 34.9592 19.3602 34.8763C19.1571 34.7933 18.9724 34.6711 18.8167 34.5167L5.86666 21.55C4.24226 19.9086 3.3311 17.6926 3.3311 15.3833C3.3311 13.0741 4.24226 10.858 5.86666 9.21666C7.50377 7.58418 9.72138 6.66745 12.0333 6.66745C14.3453 6.66745 16.5629 7.58418 18.2 9.21666L20 11.0167L21.8 9.21666C23.4371 7.58418 25.6547 6.66745 27.9667 6.66745C30.2786 6.66745 32.4962 7.58418 34.1333 9.21666C35.7577 10.858 36.6689 13.0741 36.6689 15.3833C36.6689 17.6926 35.7577 19.9086 34.1333 21.55L21.1833 34.5167C21.0276 34.6711 20.8429 34.7933 20.6398 34.8763C20.4368 34.9592 20.2193 35.0013 20 35Z" fill="#9381FF" stroke='#9381FF' strokeWidth='2'/>
                </svg>
            )
        }

        return (
            <svg className='like-svg-disactive' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={like}>
                <path d="M20 35C19.7807 35.0013 19.5632 34.9592 19.3602 34.8763C19.1571 34.7933 18.9724 34.6711 18.8167 34.5167L5.86666 21.55C4.24226 19.9086 3.3311 17.6926 3.3311 15.3833C3.3311 13.0741 4.24226 10.858 5.86666 9.21666C7.50377 7.58418 9.72138 6.66745 12.0333 6.66745C14.3453 6.66745 16.5629 7.58418 18.2 9.21666L20 11.0167L21.8 9.21666C23.4371 7.58418 25.6547 6.66745 27.9667 6.66745C30.2786 6.66745 32.4962 7.58418 34.1333 9.21666C35.7577 10.858 36.6689 13.0741 36.6689 15.3833C36.6689 17.6926 35.7577 19.9086 34.1333 21.55L21.1833 34.5167C21.0276 34.6711 20.8429 34.7933 20.6398 34.8763C20.4368 34.9592 20.2193 35.0013 20 35Z" fill="#fff" stroke='#000505' strokeWidth='2'/>
            </svg>
        )
    }

    async function deleteArticle(e) {
        e.preventDefault()
        const response = await fetch(`/api/article/delete?id=${id}`)

        if (200 === response.status) {
            navigate(`/profile/${user.id}`)
        }
    }

    function bUttonsForAuthor() {
        if (user.id === article.user.id) {
            return (
                <div className='author-managment'>
                    <Link className='link-to-update' to={`/article/${id}/update`}>Редактировать</Link>
                    <Link className='link-to-delete' to='' onClick={() => setConfirmDelete('block')}>Удалить</Link>
                </div>
            )
        }
    }

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
                        <div className='like-block'>
                            <span className='likes'>{article.likes}</span>
                            {likeButton()}
                        </div>
                        <div className='article-category-block'>
                            <span className='article-category-span'>Категория:</span>
                            <Link className='article-category' to=''>{article.category.name}</Link>
                        </div>
                        {bUttonsForAuthor()}
                    </div>
                    <div className='article-block-right'>
                        <h1 className='article-title'>{article.title}</h1>
                        <p className='article-content'>{article.content}</p>
                    </div>
                </div>
                <form className='add-comment-form' onSubmit={addComment}>
                    <div className='input-block'>
                        <input className='input' type="text" value={commentValue} required='true' maxLength='300' onChange={
                            e => {
                                setCommentLength(e.target.value.length)
                                setCommentValue(e.target.value)
                            }
                        }/>
                        <span className='input-span'>{commentLength} / 300</span>
                    </div>
                    <Button text='Оставить отзыв' />
                </form>
                <div className='comments-block'>
                    {article.comments?.map(comment => {
                        return (
                            <Comment comment={comment}/>
                        )
                    })}
                </div>
                <div className='confirm-delete-block' style={{display: confirmDelete}}>
                    <h3 className='confirm-delete-text'>Вы точно хотите удалить данную статью?</h3>
                    <div className='confirm-delete-buttons'>
                        <button className='disconfirm-delete' onClick={() => setConfirmDelete('none')}>Нет</button>
                        <button className='confirm-delete' onClick={deleteArticle}>Да</button>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ArticlePage