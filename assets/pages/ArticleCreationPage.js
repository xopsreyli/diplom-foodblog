import React, {useState, useEffect} from 'react'
import Header from "../components/Header"
import '../styles/pages/forms.css'
import Button from "../components/Button"
import '../styles/pages/article-creation.css'
import {useNavigate} from "react-router-dom"
import Footer from "../components/Footer"

function ArticleCreationPage() {
    const navigate = useNavigate()
    const [user, setUser] = useState()
    const [categories, setCategories] = useState([])
    const [img, setImg] = useState()
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState(0)
    const [error, setError] = useState('')

    useEffect(() => {
        fetch('/api/user')
            .then(response => response.json())
            .then(data => setUser(data))

        fetch('/api/category')
            .then(response => response.json())
            .then(data => setCategories(data))
    }, [])

    if (user && Object.keys(user).length === 0) {
        return navigate('/login')
    }

    async function sendArticleCreationData(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', img)
        formData.append('jsonData', JSON.stringify({
            title: title,
            content: content,
            category_id: categoryId
        }))

        const response = await fetch('/api/article/create', {
            method: 'POST',
            body: formData,
        })

        const result = await response.json()

        if (200 === response.status) {
            navigate(`/article/${result.id}`)
        } else {
            setError('Please check the details and try again!')
        }
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Create article</h1>
                <form className='form' onSubmit={sendArticleCreationData}>
                    <div className='article-uploaded-img-holder'>
                        <img className='article-uploaded-img' src={img ? URL.createObjectURL(img) : ''}/>
                    </div>
                    <div className='load-img-input-block'>
                        <label className='article-img-upload-label' htmlFor="image">
                            <span className='article-img-upload-label-text'>Upload image</span>
                            <span className='article-img-upload-label-plus'>+</span>
                        </label>
                        <input className='article-img-upload-input' type="file" id='image' name='image' required='true' accept="image/png, image/jpeg" onChange={
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
                            <option disabled='disabled' selected='selected'>Categories</option>
                            {categories.map((category, id) => {
                                return <option key={category.id} value={id}>{category.name}</option>
                            })}
                        </select>
                    </div>
                    <p className='error-message'>{error}</p>
                    <Button text='Create' />
                </form>
            </div>
            <Footer />
        </>
    )
}

export default ArticleCreationPage