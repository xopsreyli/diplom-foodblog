import React, {useState} from 'react'
import '../styles/components/slider.css'
import SliderCard from "./SliderCard";

function Slider(props) {
    const [translate, setTranslate] = useState(0)
    const [backBtnDisplay, setBackBtnDisplay] = useState('none')
    const [forwardBtnDisplay, setForwardBtnDisplay] = useState('block')
    const [sliderMoves, setSliderMoves] = useState(0)

    function moveBack() {
        setSliderMoves(sliderMoves - 1)
        if (document.body.scrollWidth <= 768) {
            setTranslate(translate + 100)
        } else if (document.body.scrollWidth <= 1024) {
            setTranslate(translate + 55)
        } else if (document.body.scrollWidth <= 1536) {
            setTranslate(translate + 35)
        } else {
            setTranslate(translate + 26)
        }
        setForwardBtnDisplay('block')
        if (1 === sliderMoves) {
            setBackBtnDisplay('none')
        }
    }

    function moveForward() {
        setSliderMoves(sliderMoves + 1)
        if (document.body.scrollWidth <= 768) {
            setTranslate(translate - 100)
            if (8 === sliderMoves) {
                setForwardBtnDisplay('none')
            }
        } else if (document.body.scrollWidth <= 1024) {
            setTranslate(translate - 55)
            if (7 === sliderMoves) {
                setForwardBtnDisplay('none')
            }
        } else if (document.body.scrollWidth <= 1536) {
            setTranslate(translate - 35)
            if (6 === sliderMoves) {
                setForwardBtnDisplay('none')
            }
        } else {
            setTranslate(translate - 26)
            if (5 === sliderMoves) {
                setForwardBtnDisplay('none')
            }
        }
        setBackBtnDisplay('block')
    }

    return (
        <div className='slider-block'>
            <h2 className='slider-title'>{props.title}</h2>
            <div className='slider-box'>
                <div className='slider-button-block'>
                    <svg className='slider-btn'  style={{display: backBtnDisplay}} width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={moveBack}>
                        <path d="M28.3941 0H11.6258C4.34216 0 0 4.34216 0 11.6258V28.3741C0 35.6778 4.34216 40.0199 11.6258 40.0199H28.3741C35.6578 40.0199 39.9999 35.6778 39.9999 28.3941V11.6258C40.0199 4.34216 35.6778 0 28.3941 0ZM23.5918 26.013C24.172 26.5933 24.172 27.5537 23.5918 28.134C23.2916 28.4342 22.9114 28.5742 22.5312 28.5742C22.151 28.5742 21.7708 28.4342 21.4707 28.134L14.4072 21.0705C13.8269 20.4902 13.8269 19.5297 14.4072 18.9494L21.4707 11.8859C22.051 11.3056 23.0115 11.3056 23.5918 11.8859C24.172 12.4662 24.172 13.4267 23.5918 14.007L17.5888 20.01L23.5918 26.013Z" fill="#000505"/>
                    </svg>
                </div>
                <div className='slider'>
                    <div className='slider-cards' style={{transform: `translateX(${translate}%)`}}>
                        {props.articles?.map(article => {
                            return (
                                <div className='slider-card-box'>
                                    <SliderCard article={article}/>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className='slider-button-block'>
                    <svg className='slider-btn' style={{display: forwardBtnDisplay}} width="40" height="41" viewBox="0 0 40 41" fill="none" xmlns="http://www.w3.org/2000/svg" onClick={moveForward}>
                        <path d="M28.3941 0H11.6258C4.34216 0 0 4.34216 0 11.6258V28.3741C0 35.6778 4.34216 40.0199 11.6258 40.0199H28.3741C35.6578 40.0199 39.9999 35.6778 39.9999 28.3941V11.6258C40.0199 4.34216 35.6778 0 28.3941 0ZM25.5928 21.0705L18.5292 28.134C18.2291 28.4342 17.8489 28.5742 17.4687 28.5742C17.0885 28.5742 16.7083 28.4342 16.4082 28.134C15.8279 27.5537 15.8279 26.5933 16.4082 26.013L22.4112 20.01L16.4082 14.007C15.8279 13.4267 15.8279 12.4662 16.4082 11.8859C16.9885 11.3056 17.9489 11.3056 18.5292 11.8859L25.5928 18.9494C26.1931 19.5297 26.1931 20.4902 25.5928 21.0705Z" fill="#000505"/>
                    </svg>
                </div>
            </div>
        </div>
    )
}

export default Slider