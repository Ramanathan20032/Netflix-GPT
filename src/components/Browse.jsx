import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ! components
import Header from './Header'
import Error from './Error'
import LoadingSpinner from './LoadingSpinner'
import MainContainer from './MainContainer'

// ! thunks
import { moviesListThunk } from '../store/thunks/moviesListThunk'

// ! constants
import { IMAGE_BASE_URL } from '../utils/constants'


const Browse = () => {
  const dispatch = useDispatch();
  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, loading, error } = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch(moviesListThunk('now_playing'));
    dispatch(moviesListThunk('popular'));
    dispatch(moviesListThunk('top_rated'));
    dispatch(moviesListThunk('upcoming'));
  }, [dispatch]);

  return (
    <div className="relative w-full h-screen bg-black">
      <Header />
      {loading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <Error />
      ) : (
        <>
          <MainContainer />
          {/* <MainContainer /> */}
        </>
      )}
    </div>
  )

}

export default Browse;