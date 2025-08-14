import { createSlice } from "@reduxjs/toolkit";
import { moviesListThunk } from "../thunks/moviesListThunk";

const moviesListSlice = createSlice({
    name: "movies",
    initialState: {
        nowPlayingMovies: [],
        popularMovies: [],
        topRatedMovies: [],
        upcomingMovies: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(moviesListThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(moviesListThunk.fulfilled, (state, action) => {
                const { category, moviesList } = action.payload;
                // dynamic update the state  state[nowPlayingMovies] = data.results
                // if the category is not matched with the existing state[nowPlayingMovies], will create new state[now_playing] = moviesList
                state[category] = moviesList;
                state.loading = false;
                state.error = null;
            })
            .addCase(moviesListThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
});


export default moviesListSlice.reducer;