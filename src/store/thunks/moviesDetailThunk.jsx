import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

// const movieDetails = {
//     'details': 'movieDetails',
//     'credits': 'movieCredits',
//     'images': 'movieImages',
//     'lists': 'movieLists',
//     'recommendations': 'movieRecommendations',
//     'release_dates': 'movieReleaseDates',
//     'reviews': 'movieReviews',
//     'similar': 'movieSimilar',
//     'translations': 'movieTranslations',
//     'watch/providers': 'movieWatchProviders',
//     'videos': 'movieVideos',
// }

// Helper function to fetch individual movie data
const fetchMovieData = async (endpoint, movieId) => {
    try {
        const url = `https://api.themoviedb.org/3/movie/${movieId}${endpoint}?language=en-US`;
        const response = await fetch(url, MOVIES_LISTING_API_OPTIONS);

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
                lists,
                recommendations,
                releaseDates,
                reviews,
                similar,
                translations,
                watchProviders,
                videos
            ] = await Promise.all([
                fetchMovieData('', movieId), // Basic details
                fetchMovieData('/credits', movieId),
                fetchMovieData('/images', movieId),
                fetchMovieData('/lists', movieId),
                fetchMovieData('/recommendations', movieId),
                fetchMovieData('/release_dates', movieId),
                fetchMovieData('/reviews', movieId),
                fetchMovieData('/similar', movieId),
                fetchMovieData('/translations', movieId),
                fetchMovieData('/watch/providers', movieId),
                fetchMovieData('/videos', movieId)
            ]);

            // Return structured data
            const movieData = {
                id: movieId,
                details,
                credits,
                images,
                lists,
                recommendations,
                releaseDates,
                reviews,
                similar,
                translations,
                watchProviders,
                videos,
            };

            console.log("ALL MOVIE DATA SUCCESSFULLY FETCHED:", movieData);
            return movieData;
        }
        catch (error) {
            console.error("Error in moviesDetailThunk:", error);
            return rejectWithValue(error.message);
        }
    }
)