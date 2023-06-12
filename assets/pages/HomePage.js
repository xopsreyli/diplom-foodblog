import React, {useEffect, useState} from 'react'
import Header from "../components/Header"
import foodBlogImage from '../../public/img/foodblog.png'
import '../styles/pages/homepage.css'
import Slider from "../components/Slider"
import Footer from "../components/Footer"

function HomePage() {
    const [latest, setLatest] = useState()
    const [popular, setPopular] = useState()

    useEffect(() => {
        fetch('/api/article/latest')
            .then(response => response.json())
            .then(data => setLatest(data.articles))

        fetch('/api/article/popular')
            .then(response => response.json())
            .then(data => setPopular(data.articles))
    }, [])

    return (
        <>
            <Header />
            <div className='main'>
                <img className='homepage-img' src={foodBlogImage}/>
                <h1 className='main-title'>FOOD BLOG</h1>
                <p className='description'>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus. Phasellus viverra nulla ut metus varius laoreet. Quisque rutrum. Aenean imperdiet. Etiam ultricies nisi vel augue. Curabitur ullamcorper ultricies nisi. Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum. Nam quam nunc, blandit vel, luctus pulvinar, hendrerit id, lorem. Maecenas nec odio et ante tincidunt tempus. Donec vitae sapien ut libero venenatis faucibus. Nullam quis ante. Etiam sit amet orci eget eros faucibus tincidunt. Duis leo. Sed fringilla mauris sit amet nibh. Donec sodales sagittis magna. Sed consequat, leo eget bibendum sodales, augue velit cursus nunc,</p>
                <Slider articles={latest} title='Latest'/>
                <Slider articles={popular} title='Popular' />
                <div className='slogans'>
                    <div>
                        <svg width="80" height="81" viewBox="0 0 80 81" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M79.2047 75.2806L76.4616 72.5376C77.8712 70.4041 78.7094 67.8135 78.7094 65.0705C78.7094 57.5272 72.6138 51.4316 65.0705 51.4316C57.5272 51.4316 51.4316 57.5272 51.4316 65.0705C51.4316 72.6138 57.5272 78.7094 65.0705 78.7094C67.8516 78.7094 70.4041 77.8712 72.5376 76.4616L75.2806 79.2047C75.814 79.738 76.5378 80.0047 77.2236 80.0047C77.9474 80.0047 78.6332 79.738 79.1666 79.2047C80.2714 78.0998 80.2714 76.3473 79.2047 75.2806Z" fill="#9381FF"/>
                            <path d="M3.9306 51.9227C3.9306 52.037 3.8544 52.1894 3.8544 52.3037C7.35937 59.3136 13.074 65.0663 20.0839 68.5332C20.1982 68.5332 20.3506 68.457 20.4649 68.457C19.1696 64.0377 18.179 59.5041 17.4552 54.9705C12.8835 54.2085 8.3499 53.218 3.9306 51.9227Z" fill="#9381FF"/>
                            <path d="M68.8349 20.6923C65.2537 13.1871 59.1962 7.12958 51.7291 3.58652C53.1006 8.12012 54.2436 12.768 55.0055 17.4159C59.6534 18.1778 64.3013 19.2827 68.8349 20.6923Z" fill="#9381FF"/>
                            <path d="M3.54189 20.6851C8.11358 19.3136 12.7615 18.1707 17.4094 17.4088C18.1713 12.8752 19.1238 8.37966 20.4191 3.96035C20.3048 3.96035 20.1524 3.88416 20.0381 3.88416C12.8758 7.42722 7.04685 13.4085 3.54189 20.6851Z" fill="#9381FF"/>
                            <path d="M48.8398 16.6105C47.9255 11.6578 46.7826 6.70516 45.1444 1.90487C45.0682 1.63819 45.0682 1.40961 45.0301 1.10483C42.2109 0.419072 39.2393 0 36.1915 0C33.1055 0 30.172 0.419072 27.3147 1.14292C27.2766 1.40961 27.3147 1.63819 27.2385 1.94297C25.6384 6.74325 24.4574 11.6578 23.5431 16.6105C31.9626 15.6962 40.4203 15.6962 48.8398 16.6105Z" fill="#9381FF"/>
                            <path d="M16.6105 23.5431C11.6197 24.4574 6.74325 25.6384 1.90487 27.2385C1.63819 27.3147 1.40961 27.3147 1.14292 27.3528C0.419072 30.172 0 33.1436 0 36.1915C0 39.2774 0.419072 42.2109 1.14292 45.0682C1.40961 45.1063 1.63819 45.0682 1.94297 45.1444C6.74325 46.7445 11.6578 47.9255 16.6486 48.8398C15.6962 40.4203 15.6962 31.9626 16.6105 23.5431Z" fill="#9381FF"/>
                            <path d="M71.2381 27.3528C70.9714 27.3528 70.7428 27.3147 70.438 27.2385C65.6377 25.6384 60.6851 24.4574 55.7324 23.5431C56.6848 31.9626 56.6848 40.4203 55.7324 48.8017C60.6851 47.8874 65.6377 46.7445 70.438 45.1063C70.7047 45.0301 70.9333 45.0682 71.2381 45.0301C71.9238 42.1728 72.381 39.2393 72.381 36.1534C72.381 33.1436 71.9619 30.2101 71.2381 27.3528Z" fill="#9381FF"/>
                            <path d="M23.5431 55.7706C24.4574 60.7613 25.6003 65.6759 27.2385 70.4762C27.3147 70.7429 27.2766 70.9714 27.3147 71.2762C30.172 71.962 33.1055 72.381 36.1915 72.381C39.2393 72.381 42.2109 71.962 45.0301 71.2381C45.0682 70.9714 45.0682 70.7429 45.1444 70.4381C46.7445 65.6378 47.9255 60.7232 48.8398 55.7325C44.6491 56.1896 40.4203 56.5325 36.1915 56.5325C31.9626 56.5325 27.7338 56.2277 23.5431 55.7706Z" fill="#9381FF"/>
                            <path d="M22.6739 22.674C21.531 31.665 21.531 40.7323 22.6739 49.7614C31.6649 50.9043 40.7323 50.9043 49.7614 49.7614C50.9043 40.7704 50.9043 31.7031 49.7614 22.674C40.7323 21.531 31.6649 21.531 22.6739 22.674Z" fill="#9381FF"/>
                        </svg>
                        <p className='slogan-text'>Search</p>
                    </div>
                    <div>
                        <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M54.36 41.6V57.88C54.36 59.32 54.2 60.68 53.84 61.92C52.36 67.8 47.48 71.48 40.76 71.48H29.88L17.8 79.52C16 80.76 13.6 79.44 13.6 77.28V71.48C9.52 71.48 6.12 70.12 3.76 67.76C1.36 65.36 0 61.96 0 57.88V41.6C0 34 4.72 28.76 12 28.08C12.52 28.04 13.04 28 13.6 28H40.76C48.92 28 54.36 33.44 54.36 41.6Z" fill="#9381FF"/>
                            <path d="M63 54.4C68.08 54.4 72.36 52.72 75.32 49.72C78.32 46.76 80 42.48 80 37.4V17C80 7.6 72.4 0 63 0H29C19.6 0 12 7.6 12 17V20C12 21.12 12.88 22 14 22H40.76C51.6 22 60.36 30.76 60.36 41.6V52.4C60.36 53.52 61.24 54.4 62.36 54.4H63Z" fill="#9381FF"/>
                        </svg>
                        <p className='slogan-text'>Share</p>
                    </div>
                </div>
                <div className='slogan-solo'>
                    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" fill="#9381FF" height="80" width="80" version="1.1" viewBox="0 0 268.333 268.333" enable-background="new 0 0 268.333 268.333">
                        <g>
                            <path d="m250.833,29.916h-19.333v-11.5c0-6.996-5.671-12.667-12.667-12.667h-169.333c-6.996,0-12.667,5.671-12.667,12.667v11.5h-19.333c-9.665,0-17.5,7.835-17.5,17.5 0,9.665 7.835,17.5 17.5,17.5h19.333v1.01c0,53.117 43.578,96.177 97.333,96.177 53.756,0 97.333-43.06 97.333-96.177v-1.01h19.333c9.665,0 17.5-7.835 17.5-17.5 0.001-9.665-7.834-17.5-17.499-17.5z"/>
                            <path d="m188.249,238.75h-108.165c-6.581,0-11.917,5.335-11.917,11.917s5.335,11.917 11.917,11.917h108.165c6.581,0 11.917-5.335 11.917-11.917s-5.336-11.917-11.917-11.917z"/>
                            <path d="m136.387,171.466c-0.597-0.287-1.314-0.128-1.732,0.386-4.046,4.973-13.248,13.791-11.726,25.061 1.732,12.826 9.576,19.437 7.998,27.723-0.225,1.179 0.362,2.365 1.436,2.901 1.074,0.537 2.373,0.295 3.183-0.592 6.111-6.69 12.376-16.231 9.149-24.94-4.881-13.174-9.674-19.021-7.528-28.945 0.139-0.647-0.183-1.306-0.78-1.594z"/>
                            <path d="m172.529,171.466c-0.597-0.287-1.314-0.128-1.732,0.386-4.046,4.973-13.248,13.791-11.726,25.061 1.732,12.826 9.576,19.437 7.998,27.723-0.225,1.179 0.362,2.365 1.436,2.901 1.074,0.537 2.373,0.295 3.183-0.592 6.111-6.69 12.376-16.231 9.149-24.94-4.881-13.174-9.674-19.021-7.528-28.945 0.139-0.647-0.183-1.306-0.78-1.594z"/>
                            <path d="m100.245,171.466c-0.597-0.287-1.314-0.128-1.732,0.386-4.046,4.973-13.248,13.791-11.726,25.061 1.732,12.826 9.576,19.437 7.998,27.723-0.225,1.179 0.362,2.365 1.436,2.901 1.074,0.537 2.373,0.295 3.183-0.592 6.111-6.69 12.376-16.231 9.149-24.94-4.881-13.174-9.674-19.021-7.528-28.945 0.14-0.647-0.183-1.306-0.78-1.594z"/>
                        </g>
                    </svg>
                    <p className='slogan-text'>Cook yourself</p>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default HomePage