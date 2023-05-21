import React, {useState} from 'react'

function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    async function sendLoginData(e) {
        e.preventDefault()
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({
                email: email,
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
            <form onSubmit={sendLoginData}>
                <input type='text' placeholder='Email' value={email} required='true' onChange={
                    (e) => {setEmail(e.target.value)}
                }/>
                <input type='password' placeholder='Password*' value={password} required='true' onChange={
                    (e) => {setPassword(e.target.value)}
                }/>
                <input type="submit" value='Войти'/>
            </form>
        </>
    )
}

export default LoginPage