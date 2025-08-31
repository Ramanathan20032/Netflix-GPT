import { createSlice } from "@reduxjs/toolkit";
import { tvListThunk } from "../thunks/tvListThunk";

const tvListSlice = createSlice({
    name: "tvList",
    initialState: {
        airingTodayTv: [],
        onTheAirTv: [],
        popularTv: [],
        topRatedTv: [],
        tvLoading: false,
        tvError: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(tvListThunk.pending, (state) => {
                state.tvLoading = true;
                state.tvError = null;
            })
            .addCase(tvListThunk.fulfilled, (state, action) => {
                const { category, tvList } = action.payload;
                state[category] = tvList;
                state.tvLoading = false;
                state.tvError = null;
            })
            .addCase(tvListThunk.rejected, (state, action) => {
                state.tvLoading = false;
                state.tvError = action.payload;
            })
    }
})

export default tvListSlice.reducer;