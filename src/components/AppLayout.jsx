import React from 'react'
import { Outlet } from 'react-router-dom'
import ScrollToTop from './ScrollToTop/ScrollToTop'

const AppLayout = () => {
    return (
        <>
            <ScrollToTop />
            <Outlet />
        </>
    )
}

export default AppLayout


