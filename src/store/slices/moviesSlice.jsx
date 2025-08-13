import { createSlice } from "@reduxjs/toolkit";
import { moviesThunk } from "../thunks/moviesThunk";

const moviesSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => { 
        builder
        .addCase(moviesThunk.pending, (state) => {
            state.loading = true;
            state.error = null;
            state.nowPlayingMovies = [];  
        })
        .addCase(moviesThunk.fulfilled, (state, action) => {
            state.nowPlayingMovies = action.payload;
            state.loading = false;
            state.error = null;
        })
        .addCase(moviesThunk.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.nowPlayingMovies = [];
        })
    }
});


export default moviesSlice.reducer;