import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Login from './Login'
import Browse from './Browse'
import Error from './Error'


const Body = () => {
  
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "*",
      element: <Error />
    }
  ])


  return (
    <RouterProvider router={appRouter} />
  )
}

export default Body;