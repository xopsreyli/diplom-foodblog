import React, {useState} from 'react'

function RegistrationPage() {
    const [email, setEmail] = useState('')
    const [nickname, setNickname] = useState('')
    const [password, setPassword] = useState('')
    const [repeatedPassword, setRepeatedPassword] = useState('')
    async function sendRegistrationData(e) {
        e.preventDefault()
        const response = await fetch('/api/user/registration', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
                nickname: nickname,
                password: password
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        return await response.json()
    }

    return (
        <>
            <form onSubmit={sendRegistrationData}>
                <input type='text' placeholder='Email' value={email} required='true' onChange={
                    (e) => {setEmail(e.target.value)}
                }/>
                <input type='text' placeholder='Nickname' value={nickname} required='true' onChange={
                    (e) => {setNickname(e.target.value)}
                }/>
                <input type='password' placeholder='Password*' value={password} required='true' onChange={
                    (e) => {setPassword(e.target.value)}
                }/>
                <input type='password' placeholder='Repeat password*' value={repeatedPassword} required='true' onChange={
                    (e) => {setRepeatedPassword(e.target.value)}
                }/>
                <input type='submit' value='Зарегестрироваться'/>
            </form>
        </>
    )
}

export default RegistrationPage
