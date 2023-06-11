import React, {useState} from 'react'
import Header from "../components/Header"
import '../styles/pages/update-password-page.css'
import Button from "../components/Button"
import {useNavigate} from "react-router-dom";

function UpdatePasswordPage() {
    const navigate = useNavigate()
    const [currentPswd, setCurrentPswd] = useState('')
    const [code, setCode] = useState(0)
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [step, setStep] = useState('oldPassword')

    async function sendCurrentPassword(e) {
        e.preventDefault()
        const response = await fetch('/api/user/password/reset', {
            method: 'POST',
            body: JSON.stringify({
                password: currentPswd
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (200 === response.status) {
            setStep('code')
        }
    }

    async function sendCode(e) {
        e.preventDefault()
        const response = await fetch('/api/user/password/reset/code', {
            method: 'POST',
            body: JSON.stringify({
                code: code
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (200 === response.status) {
            setStep('newPassword')
        }
    }

    async function sendNewPassword(e) {
        e.preventDefault()
        const response = await fetch('/api/user/password/reset/new', {
            method: 'POST',
            body: JSON.stringify({
                password: newPassword
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if (200 === response.status) {
            navigate('/')
        }
    }

    let stage = ''

    if ('oldPassword' === step) {
        stage = (
            <div>
                <h1 className='main-title'>Введите старый пароль</h1>
                <form className='update-pswd-form' onSubmit={sendCurrentPassword}>
                    <input className='update-pswd-input' type="password" placeholder='Password' onChange={(e) => {
                        setCurrentPswd(e.target.value)
                    }}/>
                    <Button text='Отправить'/>
                </form>
            </div>
        )
    } else if ('code' === step) {
        stage = (
            <div>
                <h1 className='main-title'>Введите код</h1>
                <form className='update-pswd-form' onSubmit={sendCode}>
                    <input className='update-pswd-input' type="number" min='1000' max='9999' placeholder='Code' onChange={(e) => {
                        setCode(e.target.value)
                    }}/>
                    <Button text='Отправить'/>
                </form>
            </div>
        )
    } else {
        stage = (
            <div>
                <h1 className='main-title'>Введите старый пароль</h1>
                <form className='update-pswd-form' onSubmit={sendNewPassword}>
                    <input className='update-pswd-input' type="password" value={newPassword} placeholder='New Password*' onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}/>
                    <input className='update-pswd-input' type="password" placeholder='Repeat New Password*' onChange={(e) => {
                        setRepeatNewPassword(e.target.value)
                    }}/>
                    <Button text='Отправить'/>
                </form>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className='main'>
                {stage}
            </div>
        </>
    )
}

export default UpdatePasswordPage