import { createSlice } from "@reduxjs/toolkit";
import { mediaCategoryThunk } from "../thunks/mediaCategoryThunk";

const mediaCategorySlice = createSlice({
    name: "mediaCategory",
    initialState: {
        mediaCategoryData: {
            results: [],
            page: 0,
            total_pages: 0,
            total_results: 0,
        },
        mediaCategoryLoading: false,
        mediaCategoryError: null,
    },
    reducers: {
        clearMediaCategory: (state) => {
            state.mediaCategoryData = {
                results: [],
                page: 0,
                total_pages: 0,
                total_results: 0,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(mediaCategoryThunk.pending, (state) => {
                state.mediaCategoryLoading = true;
                state.mediaCategoryError = null;
            })
            .addCase(mediaCategoryThunk.fulfilled, (state, action) => {
                state.mediaCategoryLoading = false;
                state.mediaCategoryError = null;

                const { mediaType, mediaCategory } = action.payload;
                const { results, total_pages, page } = mediaCategory;

                if(page === 1) {
                    state.mediaCategoryData.results = results;
                } else {
                    state.mediaCategoryData.results = [...state.mediaCategoryData.results, ...results]
                }

                state.mediaCategoryData.total_pages = total_pages;
                state.mediaCategoryData.page = page;
            })
            .addCase(mediaCategoryThunk.rejected, (state, action) => {
                state.mediaCategoryLoading = false;
                state.mediaCategoryError = action.payload;
            })
    }
});

export default mediaCategorySlice.reducer;
export const { clearMediaCategory } = mediaCategorySlice.actions;