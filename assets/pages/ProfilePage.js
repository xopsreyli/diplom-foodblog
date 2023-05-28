import React, {useEffect, useState} from 'react'
import {useParams} from "react-router-dom";

function ProfilePage() {
    let {id} = useParams()
    const [profileUserData, setProfileUserData] = useState({})

    useEffect(() => {
        fetch(`/api/user/profile?id=${id}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                console.log(data)
                setProfileUserData(data)
            });
    }, [])

    return (
        <>
            <p>{profileUserData.id}</p>
            <p>{profileUserData.nickname}</p>
        </>
    )
}

export default ProfilePage