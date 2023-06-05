import React, {useEffect, useState} from 'react'
import '../styles/components/header.css'
import {Link} from "react-router-dom";

function Header() {
    const [user, setUser] = useState({})

    useEffect(() => {
        fetch('/api/user')
            .then(response => {
                return response.json()
            })
            .then(data => {
                setUser(data)
            }
        )
    }, [])

   function resolveLinks() {
       if (Object.keys(user).length === 0) {
           return (
               <Link className='nav-link' to="/login">Войти</Link>
           )
       } else {
           if (user.image_key) {
               return (
                   <Link className='nav-link link-to-profile' to={`/profile/${user.id}`}>
                       <div className='link-to-profile-image-span'>
                           <img className='link-to-profile-image' src={`http://localhost:9000/avatars/${user.image_key}`}/>
                       </div>
                       <span className='link-to-profile-text'>
                       {user.nickname}
                   </span>
                   </Link>
               )
           }

           return (
               <Link className='nav-link link-to-profile' to={`/profile/${user.id}`}>
                   <div className='link-to-profile-image-span' style={{padding: '4px'}}>
                       <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50 0C36.25 0 25 14 25 31.25C25 48.5 36.25 62.5 50 62.5C63.75 62.5 75 48.5 75 31.25C75 14 63.75 0 50 0ZM23.875 62.5C10.625 63.125 0 74 0 87.5V100H100V87.5C100 74 89.5 63.125 76.125 62.5C69.375 70.125 60.125 75 50 75C39.875 75 30.625 70.125 23.875 62.5Z" fill="#FEFCFD"/>
                       </svg>
                   </div>
                   <span className='link-to-profile-text'>
                       {user.nickname}
                   </span>
               </Link>
           )
       }
   }

    return (
        <header>
            <Link className='header-logo' to='/'>
                <svg width="150" height="47" viewBox="0 0 150 47" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                    <rect width="150" height="46.95" fill="url(#pattern0)"/>
                    <defs>
                        <pattern id="pattern0" patternContentUnits="objectBoundingBox" width="1" height="1">
                            <use xlinkHref="#image0_3_3" transform="scale(0.0005 0.00159744)"/>
                        </pattern>
                        <image id="image0_3_3" width="2000" height="626" xlinkHref="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAB9AAAAJyCAMAAACrCqsJAAADAFBMVEVMaXH/+/v9/P3//Pz/+v///////Pz//Pz//Pz/+/v9+/39+/39+/3//Pz//Pz9+/3////9+/z9+/z9/P39+/z9+/z9+/39+/z//Pz9+/z////////9+/3//Pz9+/z////////////9+/z////9+/z/////////+/v//Pz/+/v////9+/z/+/v////9+/z9+/3/////////////+/v////////9+/z/+/v////9+/39+/z9+/z9+/z9+/z9+/39+/z9+/z/////+/v9+/3//////////Pz9+/39/Pz9+/z////9/Pz9+/z/+/v////9+/z/+/v9+/z9+/3////9+/z9+/z9+/z////////9+/z////9/Pz9+/z9/Pz9+/z////9/Pz////9+/z/+v/9+/z////9+/z9/Pz/+f//////+v/9+/z/+v/9+/39+/z9+/39/Pz/+v//+v/9+/z////////9/P38/Pz9+/3//Pz////////////9/Pz9/Pz//Pz/////+f//+/v9+/z9+/z9/Pz9+/39/P39+/z9+/3/+/v////9/P39/Pz9/P3/+/v//Pz/+f/9/Pz9+/39+/z9/Pz/+f///Pz//Pz9/P3/+v//+/v/+v///Pz/+/v9+/39+/39+/z9+/39/P39/P3//Pz//Pz9/Pz/+v/9+/z//Pz//////Pz9+/3//Pz9/Pz9+/39/P39/P39/Pz/+v/9+/3//Pz/+/v9/Pz9/P39+/z//Pz/+/v9+/39+/39+/3//Pz/+f///Pz/+v//////+/v////9+/39+/3/+f/9+/3//Pz9+/39+/39+/39+/39/P39+/z9/Pz/+v/9/P39/P39/P39/P3//Pz9+/3/+f///Pz//Pz//Pz/+/v/+v/9/Pz9+/3//Pz////9/P3//Pz9+/3//Pz//Pz//Pz9/Pz9+/3//Pz9+/3/+/v/+f///Pz9+/39/Pz9/Pz9+/39+/3//Pz9/P3//Pz//Pz9/P3/+/v//Pz//Pz9/P3+/P36YfDxAAAA/3RSTlMATbtuMxF0ZlVEn4OZaWOJAff+quP4jfZ3/SkKnV78BAID+wf6BRtLVkgG80YJ7qMIDgtHEhPdRQyA8fny8Ij19A1JghAVWKLS6SHE5koP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"/>
                    </defs>
                </svg>
            </Link>
            <nav>
                <Link className='nav-link' to="/">Главная</Link>
                <Link className='nav-link' to="/search">Поиск</Link>
                <Link className='nav-link' to="/article/create">Добавить</Link>
                {resolveLinks()}
            </nav>
        </header>
    )
}

export default Header