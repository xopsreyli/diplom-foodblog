import React, {useState} from 'react'
import Header from "../components/Header"
import '../styles/pages/update-password-page.css'
import Button from "../components/Button"
import {useNavigate} from "react-router-dom"
import Footer from "../components/Footer"

function UpdatePasswordPage() {
    const navigate = useNavigate()
    const [currentPswd, setCurrentPswd] = useState('')
    const [code, setCode] = useState(0)
    const [newPassword, setNewPassword] = useState('')
    const [repeatNewPassword, setRepeatNewPassword] = useState('')
    const [step, setStep] = useState('oldPassword')
    const [error, setError] = useState('')

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
            setError('')
        } else {
            setError('Wrong password!')
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
            setError('')
        } else {
            setError('Code is wrong!')
        }
    }

    async function sendNewPassword(e) {
        e.preventDefault()
        if (newPassword !== repeatNewPassword) {
            setError('Passwords mismatch!')
        } else {
            const response = await fetch('/api/user/password/reset/new', {
                method: 'POST',
                body: JSON.stringify({
                    password: newPassword
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            setStep('success')
        }
    }

    let stage = ''

    if ('oldPassword' === step) {
        stage = (
            <div>
                <h1 className='main-title'>Enter old Password</h1>
                <form className='update-pswd-form' onSubmit={sendCurrentPassword}>
                    <input className='update-pswd-input' type="password" placeholder='Password' onChange={(e) => {
                        setCurrentPswd(e.target.value)
                    }}/>
                    <p className='error-message'>{error}</p>
                    <Button text='Send'/>
                </form>
            </div>
        )
    } else if ('code' === step) {
        stage = (
            <div>
                <h1 className='main-title'>Enter code</h1>
                <form className='update-pswd-form' onSubmit={sendCode}>
                    <input className='update-pswd-input' type="number" min='1000' max='9999' placeholder='Code' onChange={(e) => {
                        setCode(e.target.value)
                    }}/>
                    <p className='error-message'>{error}</p>
                    <Button text='Send'/>
                </form>
            </div>
        )
    } else if ('newPassword' === step) {
        stage = (
            <div>
                <h1 className='main-title'>Create a new password</h1>
                <form className='update-pswd-form' onSubmit={sendNewPassword}>
                    <input className='update-pswd-input' type="password" value={newPassword} minLength='8' placeholder='New Password*' onChange={(e) => {
                        setNewPassword(e.target.value)
                    }}/>
                    <input className='update-pswd-input' type="password" placeholder='Repeat New Password*' onChange={(e) => {
                        setRepeatNewPassword(e.target.value)
                    }}/>
                    <p className='error-message'>{error}</p>
                    <Button text='Send'/>
                </form>
            </div>
        )
    } else {
        stage = (
            <div>
                <h1 className='main-title'>Password was successfully changed!</h1>
            </div>
        )
    }

    return (
        <>
            <Header />
            <div className='main'>
                {stage}
            </div>
            <Footer />
        </>
    )
}

export default UpdatePasswordPage