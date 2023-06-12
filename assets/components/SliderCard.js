import React from 'react'
import '../styles/components/slider-card.css'
import {Link} from "react-router-dom"

function SliderCard(props) {
    return (
        <Link className='slider-card' to={`/article/${props.article.id}`}>
            <img className='slider-card-img' src={`http://localhost:9000/articles/${props.article.image_key}`} alt=""/>
            <div className='slider-card-2-layer'>
                <p className='slider-card-title'>{props.article.title}</p>
            </div>
        </Link>
    )
}

export default SliderCard