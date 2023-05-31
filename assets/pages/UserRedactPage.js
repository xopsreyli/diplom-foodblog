import React, {useCallback, useEffect, useState} from 'react'
import Header from "../components/Header"
import '../styles/pages/user-redact-page.css'
import { Upload } from 'antd'
import ImgCrop from 'antd-img-crop'

function UserRedactPage() {
    const [user, setUser] = useState({})
    const [img, setImg] = useState(null)
    const [nickname, setNickname] = useState('')

    useEffect(() => {
        fetch('/api/user')
            .then(response => {
            return response.json()
            })
            .then(data => {
                setUser(data)
                setNickname(data.nickname)
            })
    }, [])

    function resolveAvatar() {
        if (!user.image_key && !img) {
            return (
                <div className='user-avatar-field'>
                    <svg width="120" height="120" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M50.1036 0.645782C36.3536 0.645782 25.1036 14.6458 25.1036 31.8958C25.1036 49.1458 36.3536 63.1458 50.1036 63.1458C63.8536 63.1458 75.1036 49.1458 75.1036 31.8958C75.1036 14.6458 63.8536 0.645782 50.1036 0.645782ZM23.9786 63.1458C10.7286 63.7708 0.103615 74.6458 0.103615 88.1458V100.646H100.104V88.1458C100.104 74.6458 89.6036 63.7708 76.2286 63.1458C69.4786 70.7708 60.2286 75.6458 50.1036 75.6458C39.9786 75.6458 30.7286 70.7708 23.9786 63.1458Z" fill="#000505"/>
                    </svg>
                    <div className='uaf-hover-block'>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.7778 22.2222H2.22222C1.00741 22.2222 0 21.2148 0 20C0 18.7852 1.00741 17.7778 2.22222 17.7778H37.7778C38.9926 17.7778 40 18.7852 40 20C40 21.2148 38.9926 22.2222 37.7778 22.2222Z" fill="#9381FF"/>
                            <path d="M20 40C18.7852 40 17.7778 38.9926 17.7778 37.7778V2.22222C17.7778 1.00741 18.7852 0 20 0C21.2148 0 22.2222 1.00741 22.2222 2.22222V37.7778C22.2222 38.9926 21.2148 40 20 40Z" fill="#9381FF"/>
                        </svg>
                    </div>
                </div>
            )
        } else if (img) {
            return (
                <div className='user-avatar-field'>
                    <img className='user-avatar-image' src={URL.createObjectURL(img)}/>
                    <div className='uaf-hover-block'>
                        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M37.7778 22.2222H2.22222C1.00741 22.2222 0 21.2148 0 20C0 18.7852 1.00741 17.7778 2.22222 17.7778H37.7778C38.9926 17.7778 40 18.7852 40 20C40 21.2148 38.9926 22.2222 37.7778 22.2222Z" fill="#9381FF"/>
                            <path d="M20 40C18.7852 40 17.7778 38.9926 17.7778 37.7778V2.22222C17.7778 1.00741 18.7852 0 20 0C21.2148 0 22.2222 1.00741 22.2222 2.22222V37.7778C22.2222 38.9926 21.2148 40 20 40Z" fill="#9381FF"/>
                        </svg>
                    </div>
                </div>
            )
        }

        return (
            <div className='user-avatar-field'>
                <img className='user-avatar-image' src={`http://localhost:9000/avatars/${user.image_key}`}/>
                <div className='uaf-hover-block'>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M37.7778 22.2222H2.22222C1.00741 22.2222 0 21.2148 0 20C0 18.7852 1.00741 17.7778 2.22222 17.7778H37.7778C38.9926 17.7778 40 18.7852 40 20C40 21.2148 38.9926 22.2222 37.7778 22.2222Z" fill="#9381FF"/>
                        <path d="M20 40C18.7852 40 17.7778 38.9926 17.7778 37.7778V2.22222C17.7778 1.00741 18.7852 0 20 0C21.2148 0 22.2222 1.00741 22.2222 2.22222V37.7778C22.2222 38.9926 21.2148 40 20 40Z" fill="#9381FF"/>
                    </svg>
                </div>
            </div>
        )
    }

    async function sendData(e) {
        e.preventDefault()

        const formData = new FormData()

        formData.append('image', img)
        formData.append('jsonData', JSON.stringify({
            nickname: nickname
        }))

        const response = await fetch('/api/user/update', {
            method: 'POST',
            body: formData,
        })

        return await response.json()
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Редактирование</h1>
                <form className='update-user-form' onSubmit={sendData}>
                    <ImgCrop quality={1} maxZoom={5}>
                        <Upload onChange={e => {
                            setImg(e.file.originFileObj)
                        }}>
                            {resolveAvatar()}
                        </Upload>
                    </ImgCrop>
                    <div className='uuf-nickname-block'>
                        <input className='uuf-nickname' type="text" value={nickname} maxLength={30} onChange={
                            e => {setNickname(e.target.value)}
                        }/>
                        <span className='uuf-nickname-length'>{nickname.length} / 30</span>
                    </div>
                    <input className='uuf-btn' type="submit" value='Изменить'/>
                </form>
            </div>
        </>
    )
}

export default UserRedactPage