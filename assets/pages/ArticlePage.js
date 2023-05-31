import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom"

function ArticlePage() {
    let {id} = useParams()
    const [article, setArticle] = useState({})

    useEffect(() => {
        fetch(`/api/article?id=${id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setArticle(data)
            })
    }, [])

    return (
        <>

        </>
    )
}

export default ArticlePage