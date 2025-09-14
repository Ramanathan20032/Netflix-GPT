import { createSlice } from "@reduxjs/toolkit";
import { tvSeriesSeasonThunk } from "../thunks/tvSeriesSeasonThunk";

const tvSeriesSeasonSlice = createSlice({
    name: 'tvSeriesSeason',
    initialState: {
        tvSeriesSeason: [],
        tvSeriesSeasonLoading: false,
        tvSeriesSeasonError: null
    },
    reducers: {
        clearTvSeriesData: (state) => {
            state.tvSeriesSeason = [],
            state.tvSeriesSeasonLoading = false,
            state.tvSeriesSeasonError = null
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(tvSeriesSeasonThunk.pending, (state) => {
                state.tvSeriesSeasonLoading = true;
                state.tvSeriesSeasonError = null
            })
            .addCase(tvSeriesSeasonThunk.fulfilled, (state, action) => {
                state.tvSeriesSeason = action.payload;
                state.tvSeriesSeasonLoading = false;
                state.tvSeriesSeasonError = null
            })
            .addCase(tvSeriesSeasonThunk.rejected, (state, action) => {
                state.tvSeriesSeasonLoading = false;
                state.tvSeriesSeasonError = action.payload;
            })
    }
})

export const { clearTvSeriesData } = tvSeriesSeasonSlice.actions;
export default tvSeriesSeasonSlice.reducer;