import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

export const MovieTrailerThunk = createAsyncThunk(
    'api/movieTrailer',
    async ({ mediaType, movieId }, { rejectWithValue }) => {
        try {
            const MOVIE_TRAILER_API = `${TMDB_BASE_URL}/${mediaType}/${movieId}/videos?language=en-US`;
            const response = await fetch(MOVIE_TRAILER_API, MOVIES_LISTING_API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status : ${response.status}`)
            }

            const data = await response.json()
            console.log("MOVIE TRAILER DATA SUCCESSFULLY FETCHED");
            // console.log(data)
            return { movieId, trailer: data?.results }
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)