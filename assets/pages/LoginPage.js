import React, {useState} from 'react'
import Header from "../components/Header"
import '../styles/pages/forms.css'
import Button from "../components/Button"
import {Link, useNavigate} from "react-router-dom"
import '../styles/pages/login.css'
import Footer from "../components/Footer"

function LoginPage() {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [error, setError] = useState('')

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

        if (200 === response.status) {
            navigate('/')
        } else {
            setError('Invalid login credentials. Please check your email and password and try again.')
        }
    }

    function changePasswordType() {
        if ('password' === passwordType) {
            setPasswordType('text')
        } else {
            setPasswordType('password')
        }
    }

    let passwordSVG = ''

    if ('password' === passwordType) {
        passwordSVG = (
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.64549 13.0503C7.46872 13.0503 7.29196 12.9852 7.15241 12.8456C6.38953 12.0827 5.97088 11.0687 5.97088 9.99877C5.97088 7.77528 7.77573 5.97043 9.99922 5.97043C11.0691 5.97043 12.0832 6.38908 12.8461 7.15196C12.9763 7.2822 13.0507 7.45897 13.0507 7.64504C13.0507 7.8311 12.9763 8.00787 12.8461 8.13811L8.13857 12.8456C7.99902 12.9852 7.82225 13.0503 7.64549 13.0503ZM9.99922 7.36593C8.5479 7.36593 7.36639 8.54744 7.36639 9.99877C7.36639 10.4639 7.48733 10.9105 7.71061 11.3012L11.3017 7.71016C10.911 7.48688 10.4644 7.36593 9.99922 7.36593Z" fill="#000505"/>
                <path d="M4.04501 16.0554C3.88685 16.0554 3.71939 15.9995 3.58914 15.8879C2.59368 15.0413 1.70056 13.9993 0.937678 12.7899C-0.0484805 11.2548 -0.0484805 8.75221 0.937678 7.20783C3.2077 3.65394 6.5104 1.60719 9.99913 1.60719C12.0459 1.60719 14.0647 2.31425 15.8324 3.64464C16.1394 3.87722 16.2045 4.31448 15.9719 4.62149C15.7393 4.9285 15.3021 4.99363 14.995 4.76104C13.4693 3.60742 11.7389 3.0027 9.99913 3.0027C6.99418 3.0027 4.11943 4.80756 2.1099 7.9614C1.41215 9.04992 1.41215 10.9478 2.1099 12.0363C2.80766 13.1248 3.60775 14.0644 4.49157 14.8273C4.77997 15.0785 4.81719 15.5158 4.566 15.8135C4.43575 15.9716 4.24038 16.0554 4.04501 16.0554Z" fill="#000505"/>
                <path d="M9.99988 18.3905C8.76253 18.3905 7.55304 18.1393 6.39012 17.6462C6.03659 17.4974 5.86913 17.088 6.01799 16.7345C6.16684 16.381 6.57619 16.2135 6.92972 16.3624C7.91588 16.781 8.9486 16.995 9.99058 16.995C12.9956 16.995 15.8703 15.1901 17.8798 12.0363C18.5776 10.9478 18.5776 9.04992 17.8798 7.96142C17.5914 7.50556 17.275 7.0683 16.9402 6.65895C16.6983 6.36124 16.7448 5.92398 17.0425 5.67279C17.3402 5.4309 17.7774 5.46812 18.0287 5.77513C18.3915 6.22169 18.7451 6.70546 19.0614 7.20785C20.0475 8.74291 20.0475 11.2455 19.0614 12.7899C16.7913 16.3438 13.4886 18.3905 9.99988 18.3905Z" fill="#000505"/>
                <path d="M10.6409 13.9715C10.3153 13.9715 10.0175 13.7389 9.95242 13.404C9.87799 13.0226 10.1292 12.6597 10.5106 12.5946C11.534 12.4085 12.3899 11.5526 12.576 10.5292C12.6504 10.1478 13.0132 9.90592 13.3947 9.97105C13.7761 10.0455 14.0273 10.4083 13.9529 10.7897C13.6552 12.3992 12.3713 13.6738 10.7711 13.9715C10.7246 13.9622 10.6874 13.9715 10.6409 13.9715Z" fill="#000505"/>
                <path d="M0.695428 20C0.518663 20 0.341899 19.9349 0.202349 19.7953C-0.0674495 19.5255 -0.0674495 19.079 0.202349 18.8092L7.15197 11.8595C7.42177 11.5897 7.86833 11.5897 8.13813 11.8595C8.40798 12.1293 8.40798 12.5759 8.13813 12.8457L1.18851 19.7953C1.04896 19.9349 0.872192 20 0.695428 20Z" fill="#000505"/>
                <path d="M12.3537 8.34277C12.177 8.34277 12.0002 8.27765 11.8607 8.13813C11.5909 7.86834 11.5909 7.42177 11.8607 7.15197L18.8103 0.202349C19.0801 -0.0674495 19.5266 -0.0674495 19.7964 0.202349C20.0662 0.472147 20.0662 0.918709 19.7964 1.18851L12.8468 8.13813C12.7073 8.27765 12.5305 8.34277 12.3537 8.34277Z" fill="#000505"/>
            </svg>
        )
    } else {
        passwordSVG = (
            <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0046 12.6659C7.73703 12.6659 5.89642 10.8253 5.89642 8.55779C5.89642 6.29026 7.73703 4.44966 10.0046 4.44966C12.2721 4.44966 14.1127 6.29026 14.1127 8.55779C14.1127 10.8253 12.2721 12.6659 10.0046 12.6659ZM10.0046 5.8728C8.52449 5.8728 7.31957 7.07772 7.31957 8.55779C7.31957 10.0379 8.52449 11.2428 10.0046 11.2428C11.4846 11.2428 12.6896 10.0379 12.6896 8.55779C12.6896 7.07772 11.4846 5.8728 10.0046 5.8728Z" fill="#000505"/>
                <path d="M10.0048 17.1158C6.43737 17.1158 3.06926 15.0285 0.754269 11.4042C-0.251423 9.83872 -0.251423 7.28654 0.754269 5.71157C3.07874 2.08728 6.44686 0 10.0048 0C13.5626 0 16.9307 2.08728 19.2457 5.71157C20.2514 7.27705 20.2514 9.82923 19.2457 11.4042C16.9307 15.0285 13.5626 17.1158 10.0048 17.1158ZM10.0048 1.42315C6.94022 1.42315 4.00853 3.26375 1.9592 6.48007C1.24763 7.59014 1.24763 9.52563 1.9592 10.6357C4.00853 13.852 6.94022 15.6926 10.0048 15.6926C13.0693 15.6926 16.001 13.852 18.0503 10.6357C18.7619 9.52563 18.7619 7.59014 18.0503 6.48007C16.001 3.26375 13.0693 1.42315 10.0048 1.42315Z" fill="#000505"/>
            </svg>
        )
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Log in</h1>
                <form className='form' onSubmit={sendLoginData}>
                    <div className='input-block'>
                        <input className='input' type='text' placeholder='Email' value={email} required='true' onChange={
                            (e) => {setEmail(e.target.value)}
                        }/>
                    </div>
                    <div className='input-block'>
                        <input className='input' type={passwordType} placeholder='Password*' value={password} required='true' onChange={
                            (e) => {setPassword(e.target.value)}
                        }/>
                        <span className='input-span' onClick={changePasswordType}>
                            {passwordSVG}
                        </span>
                    </div>
                    <p className='error-message'>{error}</p>
                    <Button text='Log in'/>
                </form>
                <p className='no-account'>
                    <span>No account?</span>
                    <Link className='reg-link' to='/registration'>Register</Link>
                </p>
            </div>
            <Footer />
        </>
    )
}

export default LoginPage