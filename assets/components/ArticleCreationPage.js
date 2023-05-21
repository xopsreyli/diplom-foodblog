import React, {useState} from 'react'

function ArticleCreationPage() {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')

    async function sendArticleCreationData(e) {
        e.preventDefault()
        const response = await fetch('/api/article/create', {
            method: 'POST',
            body: JSON.stringify({
                title: title,
                content: content
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        
        return await response.json()
    }

    return (
        <>
            <form onSubmit={sendArticleCreationData}>
                <input type="text" placeholder='Title' value={title} required='true' onChange={
                    (e) => {setTitle(e.target.value)}
                }/>
                <textarea placeholder='Content' value={content} required='true' onChange={
                    (e) => {setContent(e.target.value)}
                }/>
                <input type="submit" value='Отправить'/>
            </form>
        </>
    )
}

export default ArticleCreationPage