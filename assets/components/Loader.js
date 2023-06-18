import React from 'react'
import {FadeLoader} from "react-spinners";
import '../styles/components/loader.css'

function Loader() {
    return (
        <div className='loader-box'>
            <FadeLoader color="#9381FF" />
        </div>
    )
}

export default Loader