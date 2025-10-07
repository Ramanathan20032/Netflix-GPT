import { createSlice } from "@reduxjs/toolkit";
import { MovieTrailerThunk } from "../../store/thunks/movieTrailerThunk";

const MovieTrailerSlice = createSlice({
    name: "trailer",
    initialState: {
        items: {},
        trailerLoading: false,
        trailerError: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(MovieTrailerThunk.pending, (state) => {
                state.trailerLoading = true;
                state.trailerError = null;
            })
            .addCase(MovieTrailerThunk.fulfilled, (state, action) => {
                state.trailerLoading = false;
                state.trailerError = null;
                const { movieId, trailer } = action.payload;
                state.items[movieId] = trailer;
            })
            .addCase(MovieTrailerThunk.rejected, (state, action) => {
                state.trailerLoading = false;
                state.trailerError = action.payload;
            })
    }
})

export default MovieTrailerSlice.reducer;