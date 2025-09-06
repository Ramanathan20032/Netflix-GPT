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
import { genereListThunk } from '../store/thunks/genereListThunk'

// ! constants
import { IMAGE_BASE_URL } from '../utils/constants'


const Browse = () => {
  const dispatch = useDispatch();
  const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, loading, error } = useSelector((store) => store.movies);
  const { airingTodayTv, onTheAirTv, popularTv, topRatedTv, tvLoading, tvError } = useSelector((store) => store.tvList);
  const { genereListLoading, genereListError } = useSelector((store) => store.genereList);

  // Combined loading and error states
  const isLoading = loading || tvLoading || genereListLoading;
  const hasError = error || tvError || genereListError;

  const isDataLoaded = nowPlayingMovies.length !== 0 && popularMovies.length !== 0
    && topRatedMovies.length !== 0 && upcomingMovies.length !== 0 && airingTodayTv.length !== 0
    && onTheAirTv.length !== 0 && popularTv.length !== 0 && topRatedTv.length !== 0 && genereListLoading;

  useEffect(() => {
    dispatch(genereListThunk({ mediaType: 'movie' }));
    dispatch(genereListThunk({ mediaType: 'tv' }));
  }, [dispatch]);

  useEffect(() => {
    if (isDataLoaded) {
      return;
    }
    dispatch(moviesListThunk('now_playing'));
    dispatch(moviesListThunk('popular'));
    dispatch(moviesListThunk('top_rated'));
    dispatch(moviesListThunk('upcoming'));
    dispatch(tvListThunk('airing_today'));
    dispatch(tvListThunk('on_the_air'));
    dispatch(tvListThunk('popular'));
    dispatch(tvListThunk('top_rated'));
  }, [dispatch, isDataLoaded]);

  return (
    <div className="relative w-full h-screen bg-black">
      <Header />
      {isLoading ? (
        <div className='w-full h-screen flex items-center justify-center'>
          <LoadingSpinner />
        </div>
      ) : hasError ? (
        <Error />
      ) : (
        <>
          <MainContainer />
          <SecondaryContainer />
        </>
      )}
    </div>
  )

}

export default Browse;