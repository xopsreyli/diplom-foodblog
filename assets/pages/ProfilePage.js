import React, {useEffect, useState} from 'react'
import {useParams, Link} from "react-router-dom"
import Header from "../components/Header"
import '../styles/pages/profile.css'
import ProfileStats from "../components/ProfileStats";
import ProfileArticleCard from "../components/ProfileArticleCard";

function ProfilePage() {
    let {id} = useParams()
    const [user, setUser] = useState({})
    const [profileUserData, setProfileUserData] = useState({})

    useEffect(() => {
        fetch(`/api/user/profile?id=${id}`)
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                setProfileUserData(data)
            })

        fetch('/api/user')
            .then(response => response.json())
            .then(data => setUser(data))
    }, [id])

    function settingsButton() {
        if (user.id === profileUserData.user.id) {
            return (
                <div className='profile-settings'>
                    <Link className='ps-link' to='/settings'>
                        <span className='ps-text'>Настройки</span>
                        <svg className='settings-svg' width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M17.5062 0L15.0125 5.93516C14.5137 6.08479 14.0648 6.33416 13.616 6.58354L7.6808 4.08978L4.08978 7.6808L6.58354 13.616C6.33416 14.1147 6.13466 14.5137 5.93516 15.0125L0 17.5062V22.4938L5.93516 24.9875C6.13466 25.4863 6.33416 25.8853 6.58354 26.384L4.08978 32.3192L7.6808 35.9102L13.616 33.4165C14.0648 33.616 14.5137 33.8653 15.0125 34.0648L17.5062 40H22.4938L24.9875 34.0648C25.4364 33.8653 25.9352 33.6658 26.384 33.4165L32.3192 35.9102L35.9102 32.3192L33.4165 26.384C33.616 25.9352 33.8653 25.4364 34.0648 24.9875L40 22.4938V17.5062L34.0648 15.0125C33.9152 14.5636 33.6658 14.0648 33.4165 13.616L35.9102 7.6808L32.3192 4.08978L26.384 6.58354C25.9352 6.38404 25.4364 6.13466 24.9875 5.93516L22.4938 0L17.5062 0ZM20 12.4688C24.1396 12.4688 27.4813 15.8105 27.4813 19.9501C27.4813 24.0898 24.1396 27.4314 20 27.4314C15.8603 27.4314 12.5187 24.0898 12.5187 19.9501C12.5187 15.8105 15.8603 12.4688 20 12.4688Z" fill="#000505"/>
                        </svg>
                    </Link>
                </div>
            )
        }
    }

    function resolveAvatar() {
        if (!profileUserData.user.image_key) {
            return (
                <div className='ph-left-avatar'>
                    <svg width="100" height="100" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50.1036 0.645782C36.3536 0.645782 25.1036 14.6458 25.1036 31.8958C25.1036 49.1458 36.3536 63.1458 50.1036 63.1458C63.8536 63.1458 75.1036 49.1458 75.1036 31.8958C75.1036 14.6458 63.8536 0.645782 50.1036 0.645782ZM23.9786 63.1458C10.7286 63.7708 0.103615 74.6458 0.103615 88.1458V100.646H100.104V88.1458C100.104 74.6458 89.6036 63.7708 76.2286 63.1458C69.4786 70.7708 60.2286 75.6458 50.1036 75.6458C39.9786 75.6458 30.7286 70.7708 23.9786 63.1458Z" fill="#000505"/>
                    </svg>
                </div>
            )
        }

        return (
            <div className='ph-left-avatar' style={{overflow: 'hidden'}}>
                <img className='ph-left-avatar-img' src={`http://localhost:9000/avatars/${profileUserData.user.image_key}`}/>
            </div>
        )
    }

    function subscribeButton() {
        if (user.id !== profileUserData.user.id) {
            return (
                <div className='ph-right-button-block'>
                    <button className='ph-right-button'>Подписаться</button>
                </div>
            )
        }

        return (
            <div></div>
        )
    }

    if (Object.keys(profileUserData).length === 0) {
        return
    }

    return (
        <>
            <Header />
            <div className='main'>
                {settingsButton()}
                <div className='profile-header'>
                    <div className='ph-left'>
                        {resolveAvatar()}
                        <span className='ph-left-nickname'>{profileUserData.user.nickname}</span>
                    </div>
                    <div className='ph-right'>
                        <div className='ph-right-stats'>
                            <ProfileStats number='666' text='articles'/>
                            <ProfileStats number='666' text='subscribers'/>
                            <ProfileStats number='666' text='subcriptions'/>
                        </div>
                        {subscribeButton()}
                    </div>
                </div>
                <div className='profile-articles'>
                    {profileUserData.articles?.map(article => {
                        return (
                            <ProfileArticleCard id={article.id} image={article.image_key} title={article.title}/>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default ProfilePage