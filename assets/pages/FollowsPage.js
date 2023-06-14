import React, {useEffect, useState} from 'react'
import Header from "../components/Header"
import {useParams} from "react-router-dom"
import '../styles/pages/follow.css'
import UserFollowCard from "../components/UserFollowCard"
import Footer from "../components/Footer"

function FollowersPage() {
    let { id} = useParams()
    const [follows, setFollows] = useState([])
    const [search, setSearch] = useState('')

    useEffect(() => {
        fetch(`/api/user/follows?id=${id}`)
            .then(response => response.json())
            .then(data => setFollows(data.followers))
    }, [])

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Follows</h1>
                <div className='follow-search-box'>
                    <input className='follow-search' type="text" placeholder='Nickname' onChange={(e) => {
                        setSearch(e.target.value)
                    }}/>
                </div>
                <div className='followers'>
                    {follows?.filter(follower => (
                            (!search || follower.nickname.toLowerCase().includes(search.toLowerCase()))
                        )
                    ).map(follower => {
                        return (
                            <UserFollowCard user={follower}/>
                        )
                    })
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}

export default FollowersPage