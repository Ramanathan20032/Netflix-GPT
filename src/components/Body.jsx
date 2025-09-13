import React from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Login from './Login'
import Browse from './Browse'
import Error from './Error'
import MovieInfo from './MovieInfo';
import MovieSuggestionsList from './movieListingPage/MovieSuggestionsList';
import CastCrewList from './movieListingPage/CastCrewList';
import MediaList from './movieListingPage/MediaList';


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
      element: <MovieSuggestionsList />
    },
    {
      path: "/:mediaType/genere/:genereId",
      element: <MediaList />
    },
    {
      path: "/:mediaType/:type/:endPoint",
      element: <MediaList />
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