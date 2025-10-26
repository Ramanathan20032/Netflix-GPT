import { createSlice } from "@reduxjs/toolkit";
import { movieRatingThunk } from "../thunks/movieRatingThunk";

const movieRatingSlice = createSlice({
    name: "movieRating",
    initialState: {
        ratingLoading: false,
        ratingSuccess: false,
        ratingError: null,
        ratingMessage: null,
        ratedMovies: {}
    },
    reducers: {
        resetStatus: (state) => {
            state.ratingLoading = false;
            state.ratingSuccess = false;
            state.ratingError = null;
            state.ratingMessage = null
            state.ratedMovies = {}
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(movieRatingThunk.pending, (state) => {
                state.ratingLoading = true;
                state.ratingSuccess = false;
                state.ratingError = null;
            })
            .addCase(movieRatingThunk.fulfilled, (state, action) => {
                state.ratingLoading = false;
                state.ratingSuccess = true;
                const { movieId, value, message } = action.payload;
                state.ratedMovies[movieId] = value;
                state.ratingMessage = message;
                state.ratingError = null;
            })
            .addCase(movieRatingThunk.rejected, (state, action) => {
                state.ratingLoading = false;
                state.ratingSuccess = false;
                state.ratingError = action.error.message;
            })
    }
})

export const {resetStatus} = movieRatingSlice.actions;
export default movieRatingSlice.reducer;