import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const movieTeaserThunk = createAsyncThunk(
    'api/movieTeaser',
    async (movieId, { rejectWithValue }) => {
        try{
            const MOVIE_TEASER_API = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
            const response = await fetch(MOVIE_TEASER_API, MOVIES_LISTING_API_OPTIONS);

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("movieTeaser data:", data.results);
            return data.results;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)