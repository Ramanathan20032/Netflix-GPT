import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop/ScrollToTop'
import Header from './Header'

const AppLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Header />
            <Outlet />
        </>
    )
}

export default AppLayout


