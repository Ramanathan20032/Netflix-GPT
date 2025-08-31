import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// ! components
import Header from './Header'
import Error from './Error'
import LoadingSpinner from './ui/LoadingSpinner'
import MainContainer from './MainContainer'
import SecondaryContainer from './SecondaryContainer'

// ! thunks
import { moviesListThunk } from '../store/thunks/moviesListThunk'
import { tvListThunk } from '../store/thunks/tvListThunk'

// ! constants
import { IMAGE_BASE_URL } from '../utils/constants'


const Browse = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((store) => store.movies);
  const { tvLoading, tvError } = useSelector((store) => store.tvList);

  useEffect(() => {
    dispatch(moviesListThunk('now_playing'));
    dispatch(moviesListThunk('popular'));
    dispatch(moviesListThunk('top_rated'));
    dispatch(moviesListThunk('upcoming'));
    dispatch(tvListThunk('airing_today'));
    dispatch(tvListThunk('on_the_air'));
    dispatch(tvListThunk('popular'));
    dispatch(tvListThunk('top_rated'));
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
          <SecondaryContainer/>
        </>
      )}
    </div>
  )

}

export default Browse;