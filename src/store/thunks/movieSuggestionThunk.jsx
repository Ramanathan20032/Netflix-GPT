import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

export const movieSuggestionThunk = createAsyncThunk(
    'api/movieSuggestion',
    async ({ mediaType, movieId, type, page = 1 }, { rejectWithValue }) => {
        try {
            const MOVIE_SUGGESTION_API = `${TMDB_BASE_URL}/${mediaType}/${movieId}/${type}?language=en-US&page=${page}`;
            const response = await fetch(MOVIE_SUGGESTION_API, MOVIES_LISTING_API_OPTIONS);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            // console.log("MOVIE SUGGESTION DATA SUCCESSFULLY FETCHED");

            return {
                type,
                total_pages: data.total_pages,
                results: data.results,
                page: data.page,
            };
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

