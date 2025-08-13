import { createSlice } from "@reduxjs/toolkit";
import { moviesListThunk } from "../thunks/moviesListThunk";

const moviesListSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(moviesListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.nowPlayingMovies = [];
            })
            .addCase(moviesListThunk.fulfilled, (state, action) => {
                state.nowPlayingMovies = action.payload;
                state.loading = false;
                state.error = null;
            })
            .addCase(moviesListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
                state.nowPlayingMovies = [];
            })
    }
});


export default moviesListSlice.reducer;