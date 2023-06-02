import React, {useState} from 'react'
import '../styles/components/settings-card.css'
import {Link} from "react-router-dom"

function SettingsCard(props) {
    const [borderColor, setBorderColor] = useState('')

    function handleMouseOver() {
        setBorderColor(props.borderColor)
    }

    function handleMouseOut() {
        setBorderColor('#000505')
    }

    return (
        <Link className='settings-card' to={props.url} onClick={props.onClick} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} style={{borderColor: borderColor}}>
            {props.svg}
            <div className='settings-card-content'>
                            <span className='settings-card-text' style={{color: props.textColor}}>
                                {props.text}
                            </span>
                <svg className='settings-card-content-svg' width="19" height="14" viewBox="0 0 28 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.1279 20C16.8493 20 16.5707 19.8973 16.3507 19.6774C15.9254 19.2521 15.9254 18.5481 16.3507 18.1228L24.4753 9.99815L16.3507 1.87351C15.9254 1.44822 15.9254 0.744272 16.3507 0.318974C16.776 -0.106325 17.4799 -0.106325 17.9052 0.318974L26.8072 9.22088C27.2324 9.64618 27.2324 10.3501 26.8072 10.7754L17.9052 19.6774C17.6852 19.8973 17.4066 20 17.1279 20Z" fill={props.arrowColor}/>
                    <path d="M25.7819 11.0979H1.09991C0.498626 11.0979 0 10.5993 0 9.99801C0 9.39673 0.498626 8.8981 1.09991 8.8981H25.7819C26.3832 8.8981 26.8818 9.39673 26.8818 9.99801C26.8818 10.5993 26.3832 11.0979 25.7819 11.0979Z" fill={props.arrowColor}/>
                </svg>
            </div>
        </Link>
    )
}

export default SettingsCard