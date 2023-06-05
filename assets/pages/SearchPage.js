import React, {useEffect, useState} from 'react'
import Header from "../components/Header"
import '../styles/pages/search.css'
import {Link, useSearchParams} from "react-router-dom"
import ArticleCard from "../components/ArticleCard";

function SearchPage() {
    const [categories, setCategories] = useState([])
    const [articles, setArticles] = useState([])
    const [categoryId, setCategoryId] = useState(null)
    const [contains, setContains] = useState('')

    useEffect(() => {
        fetch('/api/category')
            .then(response => response.json())
            .then(data => setCategories(data))

        fetch('/api/article/all')
            .then(response => response.json())
            .then(data => setArticles(data.articles))
    }, [])

    return (<>
        <Header/>
        <div className='main'>
            <div className='search-input-block'>
                <form className='search-form' method='get'>
                    <input className='search' type="text" placeholder='Поиск' onChange={(e) => {
                        setContains(e.target.value)
                    }}/>
                    <span className='search-btn'>
                        <svg className="search-btn-svg" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 512 512">
                            <path d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z"/>
                        </svg>
                    </span>
                </form>
            </div>
            <div className='search-nav'>
                <Link className='search-nav-link' to='/search' onClick={() => setCategoryId(null)}>Все</Link>
                {categories?.map(category => {
                    return (
                        <Link className='search-nav-link' to='' onClick={() => {
                            setCategoryId(category.id)
                        }}>{category.name}</Link>
                    )
                })}
            </div>
            <div className='articles-box'>
                {articles?.filter(article => (
                        (!categoryId || categoryId === article.category.id) &&
                        (!contains || article.title.toLowerCase().includes(contains.toLowerCase()))
                    ))
                    .map(article => (
                        <ArticleCard article={article} key={article.id} />
                    ))
                }
            </div>
        </div>
    </>)
}

export default SearchPage