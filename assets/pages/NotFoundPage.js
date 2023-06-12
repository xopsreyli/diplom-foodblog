import React from 'react'
import Header from "../components/Header"
import '../styles/pages/not-found-page.css'
import {Link} from "react-router-dom"
import Button from "../components/Button"

function NotFoundPage() {
    return (
        <>
            <Header />
            <div className='main'>
                <div className='error-code'>404</div>
                <p className='error-text'>PAGE NOT FOUND</p>
                <p className='error-description'>The page you are looking for might have been removed,<br/> had its name changed or temporarily unavailable</p>
                <div className='error-page-btn-block'>
                    <Link className='error-page-btn' to='/'>
                        <Button text='GO TO HOMEPAGE' />
                    </Link>
                </div>
            </div>
        </>
    )
}

export default NotFoundPage