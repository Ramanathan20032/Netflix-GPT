import { createSlice } from "@reduxjs/toolkit";
import { multiSearchThunk } from "../thunks/multiSearchThunk";

const multiSearchSlice = createSlice({
    name: "multiSearch",
    initialState: {
        searchLoading: false,
        searchError: null,
        searchResults: [],
        totalResults: 0
    },
    extraReducers: (builder) => {
        builder
            .addCase(multiSearchThunk.pending, (state) => {
                state.searchLoading = true;
                state.searchError = null;
            })
            .addCase(multiSearchThunk.fulfilled, (state, action) => {
                state.searchLoading = false;
                state.searchError = null;
                const {results, total_results} = action.payload;
                state.searchResults = results || [];
                state.totalResults = total_results || 0;
            })
            .addCase(multiSearchThunk.rejected, (state, action) => {
                state.searchLoading = false;
                state.searchError = action.payload;
            })
    }
})

export default multiSearchSlice.reducer;