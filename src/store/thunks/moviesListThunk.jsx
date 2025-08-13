import { MOVIES_LISTING_API_OPTIONS, MOVIES_LISTING_API } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const moviesListThunk = createAsyncThunk(
    'api/moviesList/',
    async(_, {rejectWithValue}) => {
        try {
            const response = await fetch(
                MOVIES_LISTING_API,
                MOVIES_LISTING_API_OPTIONS
            );

            if (!response.ok) { 
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("NOW_PLAYING_MOVIES", data.results);
            return data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
