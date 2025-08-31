import { createSlice } from "@reduxjs/toolkit";
import { tvDetailThunk } from "../thunks/tvDetailThunk";

const tvDetailSlice = createSlice({
    name: "tvDetail",
    initialState: {
        tvDetails: null,
        tvCredits: null,
        tvImages: null,
        tvRecommendations: null,
        tvReviews: null,
        tvSimilar: null,
        tvTranslations: null,
        tvVideos: null,
        tvDetailLoading: false,
        tvDetailError: null,
    },
    reducers: {
        clearTvDetail: (state) => {
            state.tvDetails = null;
            state.tvCredits = null;
            state.tvImages = null;
            state.tvRecommendations = null;
            state.tvReviews = null;
            state.tvSimilar = null;
            state.tvTranslations = null;
            state.tvVideos = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(tvDetailThunk.pending, (state) => {
                state.tvDetailLoading = true;
                state.tvDetailError = null;
            })
            .addCase(tvDetailThunk.fulfilled, (state, action) => {
                state.tvDetailLoading = false;
                state.tvDetailError = null;

                // Extract all the data types - match the thunk's return structure
                const {
                    details,
                    credits,
                    images,
                    recommendations,
                    reviews,
                    similar,
                    translations,
                    videos,
                } = action.payload;

                state.tvDetails = details;
                state.tvCredits = credits;
                state.tvImages = images;
                state.tvRecommendations = recommendations;
                state.tvReviews = reviews;
                state.tvSimilar = similar;
                state.tvTranslations = translations;
                state.tvVideos = videos;
            })
            .addCase(tvDetailThunk.rejected, (state, action) => {
                state.tvDetailLoading = false;
                state.tvDetailError = action.payload;
            })
    }
})

export const { clearTvDetail } = tvDetailSlice.actions;
export default tvDetailSlice.reducer;