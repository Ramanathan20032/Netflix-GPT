import { MOVIES_LISTING_API_OPTIONS } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';


const categoryMapping = {
    'now_playing': 'nowPlayingMovies',
    'popular': 'popularMovies',
    'top_rated': 'topRatedMovies',
    'upcoming': 'upcomingMovies'
}

export const moviesListThunk = createAsyncThunk(
    'api/moviesList',
    async (category, { rejectWithValue }) => {
        try {
            // ? API for all movies
            // const MOVIES_LISTING_API = `https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`;

            // ? API for Indian movies
            const MOVIES_LISTING_API = `https://api.themoviedb.org/3/movie/${category}?language=en-US&region=IN&page=1&with_origin_country=IN&include_adult=false`;
            const response = await fetch(MOVIES_LISTING_API, MOVIES_LISTING_API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // ? console.log(`${category}_Movies`, data.results);
            console.log("INDIAN MOVIES LISTING DATA SUCCESSFULLY FETCHED");
            return { category: categoryMapping[category], moviesList: data.results };
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
