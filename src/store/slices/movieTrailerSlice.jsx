import { createSlice } from "@reduxjs/toolkit";
import { MovieTrailerThunk } from "../../store/thunks/movieTrailerThunk";

const MAX_CACHE_SIZE = 50;

const MovieTrailerSlice = createSlice({
    name: "trailer",
    initialState: {
        items: {},                 // cached trailers by movieId
        cacheOrder: [],            // To Track The Sequence To Remove The First One [FIFO].
        trailer: null,             // currently active trailer
        isOpen: false,             // modal/player State
        trailerLoading: false,
        trailerError: null
    },
    reducers: {
        closeTrailer: (state) => {
            state.isOpen = false;
            state.trailer = null;
        }
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

                // If trailer for this movie already exists, just update
                if (!state.items[movieId]) {
                    state.items[movieId] = trailer;
                    state.cacheOrder.push(movieId);
                }

                // Cache eviction logic
                if (state.cacheOrder.length > MAX_CACHE_SIZE) {
                    const orderId = state.cacheOrder.shift() // remove the first
                    delete state.items[orderId]
                }

                // current trailer active state
                state.trailer = trailer;
                state.isOpen = true;
            })
            .addCase(MovieTrailerThunk.rejected, (state, action) => {
                state.trailerLoading = false;
                state.trailerError = action.payload;
            })
    }
})

export const { closeTrailer } = MovieTrailerSlice.actions;
export default MovieTrailerSlice.reducer;