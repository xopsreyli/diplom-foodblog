import React from 'react'
import Header from "../components/Header"
import '../styles/pages/settings.css'
import {Link, useNavigate} from "react-router-dom"
import SettingsCard from "../components/SettingsCard"

function SettingsPage() {
    const navigate = useNavigate()

    async function logout(e) {
        e.preventDefault()
        const response = await fetch('/api/user/logout')

        if (200 === response.status) {
            navigate('/')
        }
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Настройки</h1>
                <div className='settings-nav'>
                    <SettingsCard url='/settings/update' text='Редактировать' arrowColor='#9381FF' borderColor='#9381FF' svg={
                        <svg className='settings-card-svg' width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75 0L62.5 12.5L87.5 37.5L100 25L75 0ZM50 25L0 75V100H25L75 50L50 25Z" fill="black"/>
                        </svg>
                    }/>
                    <SettingsCard url='/'  text='Изменить пароль' arrowColor='#9381FF' borderColor='#9381FF' svg={
                        <svg className='settings-card-svg' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 0C10.3 0 7.5 2.8 7.5 6.25C7.5 6.65 7.5 7.05 7.575 7.425L0 15V20H7.5V15H12.5V12.5L12.575 12.425C12.95 12.5 13.35 12.5 13.75 12.5C17.2 12.5 20 9.7 20 6.25C20 2.8 17.2 0 13.75 0ZM15 2.5C16.375 2.5 17.5 3.625 17.5 5C17.5 6.375 16.375 7.5 15 7.5C13.625 7.5 12.5 6.375 12.5 5C12.5 3.625 13.625 2.5 15 2.5Z" fill="#000505"/>
                        </svg>
                    } />
                    <SettingsCard url='' text='Выйти' textColor='#FC2A2A' arrowColor='#FC2A2A' borderColor='#FC2A2A' onClick={logout} svg={
                        <svg className='settings-nav-link-svg-logout' width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57143 0V2.85714H20V17.1429H8.57143V20H22.8571V0H8.57143ZM5.71429 5.71429L0 10L5.71429 14.2857V11.4286H17.1429V8.57143H5.71429V5.71429Z" fill="#FC2A2A"/>
                        </svg>
                    } />
                </div>
            </div>
        </>
    )
}

export default SettingsPage