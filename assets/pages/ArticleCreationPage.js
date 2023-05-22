import React, {useState, useEffect} from 'react'

function ArticleCreationPage() {
    const [categories, setCategories] = useState([])
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [categoryId, setCategoryId] = useState(0)

    useEffect(() => {
        fetch('/api/category')
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setCategories(data)
            });
    }, [])

    async function sendArticleCreationData(e) {
        e.preventDefault()
        const response = await fetch('/api/article/create', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content,
                category_id: categoryId
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return await response.json()
    }

    // console.log(categoryId)

    return (
        <>
            <form onSubmit={sendArticleCreationData}>
                <input type='text' placeholder='Title' value={title} required='true' onChange={
                    (e) => {setTitle(e.target.value)}
                }/>
                <textarea placeholder='Content' value={content} required='true' onChange={
                    (e) => {setContent(e.target.value)}
                }/>
                <select name='categories' required='true' onChange={(e) => {
                    console.log(categories[e.target.value].id)
                    setCategoryId(categories[e.target.value].id)
                }}>
                    <option disabled='disabled' selected='selected'>Категории</option>
                    {categories.map((category, id) => {
                        return <option key={category.id} value={id}>{category.name}</option>
                    })}
                </select>
                <input type='submit' value='Отправить'/>
            </form>
        </>
    )
}

export default ArticleCreationPage