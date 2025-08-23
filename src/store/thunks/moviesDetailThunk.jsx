import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const moviesDetailThunk = createAsyncThunk(
    'api/movieDetails',
    async (movieId, {rejectWithValue}) => {
        try{
            const MOVIE_DETAILS_API = `https://api.themoviedb.org/3/movie/${movieId}?language=en-US`;
            const response = await fetch(MOVIE_DETAILS_API, MOVIES_LISTING_API_OPTIONS);

            if(!response.ok){
                throw new Error(`HTTP Error! Status: ${response.status}`);
            }

            const data = await response.json();
            // ? console.log(`MovieDetails Data: ${movieId}`, data);
            console.log("MOVIE DETAILS DATA SUCCESSFULLY FETCHED");
            return data;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)