import { createSlice } from "@reduxjs/toolkit";
import { moviesDetailThunk } from "../thunks/moviesDetailThunk";

const moviesDetailSlice = createSlice({
    name: "moviesDetail",
    initialState: {
        movieDetails: null,
        movieCredits: null,
        movieImages: null,
        movieRecommendations: null,
        movieReviews: null,
        movieSimilar: null,
        movieTranslations: null,
        movieVideos: null,
        loading: false,
        error: null,
    },
    reducers: {
        clearMovieDetails: (state) => {
            state.movieDetails = null;
            state.movieCredits = null;
            state.movieImages = null;
            state.movieRecommendations = null;
            state.movieReviews = null;
            state.movieSimilar = null;
            state.movieTranslations = null;
            state.movieVideos = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(moviesDetailThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moviesDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;

                // Extract all the data types
                const {
                    details,
                    credits,
                    images,
                    recommendations,
                    reviews,
                    similar,
                    translations,
                    videos,
                } = action.payload;

                state.movieDetails = details;
                state.movieCredits = credits;
                state.movieImages = images;
                state.movieRecommendations = recommendations;
                state.movieReviews = reviews;
                state.movieSimilar = similar;
                state.movieTranslations = translations;
                state.movieVideos = videos;
            })
            .addCase(moviesDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    }
});

export const { clearMovieDetails } = moviesDetailSlice.actions;
export default moviesDetailSlice.reducer;