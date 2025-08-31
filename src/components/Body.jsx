import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';


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
      path: "/movie/:movieId",
      element: <MovieInfo />
    },
    {
      path: "/:mediaType/:movieId/suggestions/:type",
      element: <MovieList />
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