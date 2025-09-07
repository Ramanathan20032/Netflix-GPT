import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import MovieInfo from './MovieInfo';
import MovieList from './MovieList';
import CastCrewList from './CastCrewList';
import GenereMediaList from './GenereMediaList';
import CategoryMediaList from './CategoryMediaList';


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
      path: "/:mediaType/:movieId",
      element: <MovieInfo />
    },
    {
      path: "/:mediaType/:movieId/people/:type",
      element: <CastCrewList />
    },
    {
      path: "/:mediaType/:movieId/suggestions/:type",
      element: <MovieList />
    },
    {
      path: "/:mediaType/genere/:genereId",
      element: <GenereMediaList />
    },
    {
      path: "/:mediaType/:type/:endPoint",
      element: <CategoryMediaList />
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