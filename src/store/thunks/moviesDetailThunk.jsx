import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

// Helper function to fetch individual movie data
const fetchMovieData = async (endpoint, movieId) => {
    try {
        const MOVIE_DETAIL_API = `${TMDB_BASE_URL}/movie/${movieId}${endpoint}?language=en-US`;
        const response = await fetch(MOVIE_DETAIL_API, MOVIES_LISTING_API_OPTIONS);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
};

export const moviesDetailThunk = createAsyncThunk(
    'api/movieDetails',
    async (movieId, { rejectWithValue }) => {
        try {
            // Fetch all movie data in parallel
            const [
                details,
                credits,
                images,
                recommendations,
                reviews,
                similar,
                translations,
                videos
            ] = await Promise.all([
                fetchMovieData('', movieId), // Basic details
                fetchMovieData('/credits', movieId),
                fetchMovieData('/images', movieId),
                fetchMovieData('/recommendations', movieId),
                fetchMovieData('/reviews', movieId),
                fetchMovieData('/similar', movieId),
                fetchMovieData('/translations', movieId),
                fetchMovieData('/videos', movieId)
            ]);

            // Return structured data
            const movieData = {
                id: movieId,
                details,
                credits,
                images,
                recommendations,
                reviews,
                similar,
                translations,
                videos,
            };

            console.log("ALL MOVIE DATA SUCCESSFULLY FETCHED");
            return movieData;
        }
        catch (error) {
            console.error("Error in moviesDetailThunk:", error);
            return rejectWithValue(error.message);
        }
    }
)