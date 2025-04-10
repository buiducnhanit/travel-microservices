import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/user/Header'
import Footer from '../components/user/Footer'

const UserLayout: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <main className="flex-1 pt-20">
                <Outlet />
            </main>
            <Footer />
        </div>
    )
}

export default UserLayout