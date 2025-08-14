import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ! components
import Header from './Header'
import Error from './Error'
import LoadingSpinner from './LoadingSpinner'

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
    <>
      <Header />
      {loading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : error ? (
        <Error />
      ) : (
        <div className='w-full h-screen'>
          <h1 className='text-white text-center top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 absolute text-4xl font-bold'>
            Browse
          </h1>
          {nowPlayingMovies.length > 0 && (
            <div className='text-white text-center top-3/4 left-1/2 transform -translate-x-1/2 absolute'>
              {nowPlayingMovies.map((movie) => (
                <div key={movie.id}>
                  <div className='card'>
                    <img src={`${IMAGE_BASE_URL}${movie.poster_path}`} alt={movie.title} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Browse;