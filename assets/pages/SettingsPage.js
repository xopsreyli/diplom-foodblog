import React from 'react'
import Header from "../components/Header"
import '../styles/pages/settings.css'
import {Link} from "react-router-dom"

function SettingsPage() {
    async function logout(e) {
        e.preventDefault()
        await fetch('/api/user/logout')
    }

    return (
        <>
            <Header />
            <div className='main'>
                <h1 className='main-title'>Настройки</h1>
                <div className='settings-nav'>
                    <Link className='settings-nav-link' to='/settings/update'>
                        <svg className='settings-nav-link-svg' width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M75 0L62.5 12.5L87.5 37.5L100 25L75 0ZM50 25L0 75V100H25L75 50L50 25Z" fill="black"/>
                        </svg>
                        <div className='settings-nav-link-info-block'>
                            <span className='settings-nav-link-text'>
                                Редактировать
                            </span>
                            <svg className='settings-nav-link-info-block-svg' width="19" height="14" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1279 20C16.8493 20 16.5707 19.8973 16.3507 19.6774C15.9254 19.2521 15.9254 18.5481 16.3507 18.1228L24.4753 9.99815L16.3507 1.87351C15.9254 1.44822 15.9254 0.744272 16.3507 0.318974C16.776 -0.106325 17.4799 -0.106325 17.9052 0.318974L26.8072 9.22088C27.2324 9.64618 27.2324 10.3501 26.8072 10.7754L17.9052 19.6774C17.6852 19.8973 17.4066 20 17.1279 20Z" fill="#9381FF"/>
                                <path d="M25.7819 11.0979H1.09991C0.498626 11.0979 0 10.5993 0 9.99801C0 9.39673 0.498626 8.8981 1.09991 8.8981H25.7819C26.3832 8.8981 26.8818 9.39673 26.8818 9.99801C26.8818 10.5993 26.3832 11.0979 25.7819 11.0979Z" fill="#9381FF"/>
                            </svg>
                        </div>
                    </Link>
                    <Link className='settings-nav-link' to='/'>
                        <svg className='settings-nav-link-svg' width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.75 0C10.3 0 7.5 2.8 7.5 6.25C7.5 6.65 7.5 7.05 7.575 7.425L0 15V20H7.5V15H12.5V12.5L12.575 12.425C12.95 12.5 13.35 12.5 13.75 12.5C17.2 12.5 20 9.7 20 6.25C20 2.8 17.2 0 13.75 0ZM15 2.5C16.375 2.5 17.5 3.625 17.5 5C17.5 6.375 16.375 7.5 15 7.5C13.625 7.5 12.5 6.375 12.5 5C12.5 3.625 13.625 2.5 15 2.5Z" fill="#000505"/>
                        </svg>
                        <div className='settings-nav-link-info-block'>
                            <span className='settings-nav-link-text'>
                                Изменить пароль
                            </span>
                            <svg className='settings-nav-link-info-block-svg' width="19" height="14" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1279 20C16.8493 20 16.5707 19.8973 16.3507 19.6774C15.9254 19.2521 15.9254 18.5481 16.3507 18.1228L24.4753 9.99815L16.3507 1.87351C15.9254 1.44822 15.9254 0.744272 16.3507 0.318974C16.776 -0.106325 17.4799 -0.106325 17.9052 0.318974L26.8072 9.22088C27.2324 9.64618 27.2324 10.3501 26.8072 10.7754L17.9052 19.6774C17.6852 19.8973 17.4066 20 17.1279 20Z" fill="#9381FF"/>
                                <path d="M25.7819 11.0979H1.09991C0.498626 11.0979 0 10.5993 0 9.99801C0 9.39673 0.498626 8.8981 1.09991 8.8981H25.7819C26.3832 8.8981 26.8818 9.39673 26.8818 9.99801C26.8818 10.5993 26.3832 11.0979 25.7819 11.0979Z" fill="#9381FF"/>
                            </svg>
                        </div>
                    </Link>
                    <Link className='settings-nav-link-logout' to='' onClick={logout}>
                        <svg className='settings-nav-link-svg-logout' width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.57143 0V2.85714H20V17.1429H8.57143V20H22.8571V0H8.57143ZM5.71429 5.71429L0 10L5.71429 14.2857V11.4286H17.1429V8.57143H5.71429V5.71429Z" fill="#F28599"/>
                        </svg>
                        <div className='settings-nav-link-info-block'>
                            <span className='settings-nav-link-text-logout'>
                                Выйти
                            </span>
                            <svg className='settings-nav-link-info-block-svg' width="19" height="14" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M17.1279 20C16.8493 20 16.5707 19.8973 16.3507 19.6774C15.9254 19.2521 15.9254 18.5481 16.3507 18.1228L24.4753 9.99815L16.3507 1.87351C15.9254 1.44822 15.9254 0.744272 16.3507 0.318974C16.776 -0.106325 17.4799 -0.106325 17.9052 0.318974L26.8072 9.22088C27.2324 9.64618 27.2324 10.3501 26.8072 10.7754L17.9052 19.6774C17.6852 19.8973 17.4066 20 17.1279 20Z" fill="#FC2A2A"/>
                                <path d="M25.7819 11.0979H1.09991C0.498626 11.0979 0 10.5993 0 9.99801C0 9.39673 0.498626 8.8981 1.09991 8.8981H25.7819C26.3832 8.8981 26.8818 9.39673 26.8818 9.99801C26.8818 10.5993 26.3832 11.0979 25.7819 11.0979Z" fill="#FC2A2A"/>
                            </svg>
                        </div>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default SettingsPage