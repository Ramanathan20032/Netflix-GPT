import { API_OPTIONS, NOW_PLAYING_MOVIES_API } from '../../utils/constants';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const moviesThunk = createAsyncThunk(
    'api/movies/nowPlaying',
    async(_, {rejectWithValue}) => {
        try {
            const response = await fetch(
                NOW_PLAYING_MOVIES_API,
                API_OPTIONS
            );

            if (!response.ok) { 
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            return data.results;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
)
