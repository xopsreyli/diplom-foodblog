import React, {useEffect, useState} from 'react'
import Header from "../components/Header"
import {useNavigate, useParams} from "react-router-dom"
import Button from "../components/Button"
import '../styles/pages/forms.css'

function ArticleUpdatePage() {
    let {id} = useParams()
    const navigate = useNavigate()
    const [article, setArticle] = useState({})
    const [categories, setCategories] = useState([])
    const [img, setImg] = useState()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        fetch(`/api/article?id=${id}`)
            .then(response => response.json())
            .then(data => {
                setArticle(data)
                setTitle(data.title)
                setContent(data.content)
                setCategoryId(data.category.id)
            })

        fetch('/api/category')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    async function sendArticleUpdateData(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append('img', img)
        formData.append('jsonData', JSON.stringify({
            id: article.id,
            title: title,
            content: content,
            category_id: categoryId
        }))

        const response = await fetch('/api/article/update', {
            method: 'POST',
            body: formData,
        })

        if (200 === response.status) {
            navigate(`/article/${id}`)
        }
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Редактирование статьи</h1>
                <form className='form' onSubmit={sendArticleUpdateData}>
                    <div className='article-uploaded-img-holder'>
                        <img className='article-uploaded-img' src={img ? URL.createObjectURL(img) : `http://localhost:9000/articles/${article.image_key}`}/>
                    </div>
                    <div className='load-img-input-block'>
                        <label className='article-img-upload-label' htmlFor="image">
                            <span className='article-img-upload-label-text'>Загрузить изображение</span>
                            <span className='article-img-upload-label-plus'>+</span>
                        </label>
                        <input className='article-img-upload-input' type="file" id='image' name='image' accept="image/png, image/jpeg" onChange={
                            e => setImg(e.target.files[0])
                        }/>
                    </div>
                    <div className='input-block'>
                        <input className='input' type='text' placeholder='Title' value={title} required='true' onChange={
                            (e) => {setTitle(e.target.value)}
                        }/>
                    </div>
                    <div className='input-block'>
                        <textarea className='textarea' placeholder='Content' value={content} required='true' onChange={
                            (e) => {setContent(e.target.value)}
                        }/>
                    </div>
                    <div className='input-block'>
                        <select className='select' name='categories' required='true' onChange={(e) => {
                            setCategoryId(categories[e.target.value].id)
                        }}>
                            <option disabled='disabled' >Категории</option>
                            {categories.map((category, id) => {
                                if (categoryId === category.id) {
                                    return <option selected='selected' key={category.id} value={id}>{category.name}</option>
                                } else {
                                    return <option key={category.id} value={id}>{category.name}</option>
                                }
                            })}
                        </select>
                    </div>
                    <Button text='Редактировать' />
                </form>
            </div>
        </>
    )
}

export default ArticleUpdatePage