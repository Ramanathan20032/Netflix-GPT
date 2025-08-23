import { createSlice } from "@reduxjs/toolkit";
import { moviesDetailThunk } from "../thunks/moviesDetailThunk";

export const moviesDetailSlice = createSlice({
    name: "moviesDetail",
    initialState: {
        movieDetails: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(moviesDetailThunk.pending, (state) => {
                state.loading = true;
                state.movieDetails = [];
                state.error = null;
            })
            .addCase(moviesDetailThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.movieDetails = action.payload;
                state.error = null;
            })
            .addCase(moviesDetailThunk.rejected, (state, action) => {
                state.loading = false;
                state.movieDetails = [];
                state.error = action.payload;
            })
    }
})

export default moviesDetailSlice.reducer;
