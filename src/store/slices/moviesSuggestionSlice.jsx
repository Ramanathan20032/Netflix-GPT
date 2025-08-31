import { createSlice } from "@reduxjs/toolkit";
import { movieSuggestionThunk } from "../thunks/movieSuggestionThunk";

const moviesSuggestionSlice = createSlice({
    name: "moviesSuggestion",
    initialState: {
        loading: false,
        error: null,
    },
    extraReducers: (builder) => {
        builder
            .addCase(movieSuggestionThunk.pending, (state, action) => {
                state.loading = true;
                state.error = null;

                // Initialize the type if it doesn't exist
                const { type } = action.meta.arg;
                if (!state[type]) {
                    state[type] = { results: [], total_pages: 0, page: 0, loading: true, error: null };
                } else {
                    state[type].loading = true;
                    state[type].error = null;
                }
            })
            .addCase(movieSuggestionThunk.fulfilled, (state, action) => {
                state.loading = false;
                state.error = null;
                const { type, results, total_pages, page } = action.payload;

                // Initialize the type if it doesn't exist
                if (!state[type]) {
                    state[type] = { results: [], total_pages: 0, page: 0, loading: false, error: null };
                }

                // If it's page 1, replace results; otherwise append
                if (page === 1) {
                    state[type].results = results;
                } else {
                    state[type].results = [...state[type].results, ...results];
                }

                state[type].total_pages = total_pages;
                state[type].page = page;
                state[type].loading = false;
                state[type].error = null;
            })
            .addCase(movieSuggestionThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;

                // Set error for the specific type
                const { type } = action.meta.arg;
                if (state[type]) {
                    state[type].loading = false;
                    state[type].error = action.payload;
                }
            })
    }
})

export default moviesSuggestionSlice.reducer;