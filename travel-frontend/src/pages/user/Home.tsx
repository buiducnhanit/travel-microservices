import React from 'react'
import Destinations from '../../components/user/Destinations'
import Hero from '../../components/user/Hero'
import Newsletter from '../../components/user/Newsletter'
import PopularTours from '../../components/user/PopularTours'
import Features from '../../components/user/Features/Features'

const Home: React.FC = () => {
    return (
        <>
            <Hero />
            <Features />
            <Destinations />
            <PopularTours />
            <Newsletter />
        </>
    )
}

export default Home