import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Header from './Header'
import Error from './Error'
import { moviesThunk } from '../store/thunks/moviesThunk'

const Browse = () => {
  const dispatch = useDispatch();
  const { nowPlayingMovies, loading, error } = useSelector((store) => store.movies);

  useEffect(() => {
    dispatch(moviesThunk());
  }, [dispatch]);

  return (
    <>
      <Header />
      {loading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <h1 className='text-white text-4xl font-bold'>Loading...</h1>
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
              <p>Movies loaded: {nowPlayingMovies.length}</p>
            </div>
          )}
        </div>
      )}
    </>
  )
}

export default Browse;