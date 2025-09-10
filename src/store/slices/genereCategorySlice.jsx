import { createSlice } from "@reduxjs/toolkit";
import { genereCategoryThunk } from "../thunks/genereCategoryThunk";

const genereCategorySlice = createSlice({
    name: "genereCategoryList",
    initialState: {
        genereCategoryData: {
            results: [],
            page: 0,
            total_pages: 0,
            total_results: 0,
        },
        genereCategoryListLoading: false,
        genereCategoryListError: null
    },
    reducers: {
        clearGenereCategoryList: (state) => {
            state.genereCategoryData = {
                results: [],
                page: 0,
                total_pages: 0,
                total_results: 0,
            };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(genereCategoryThunk.pending, (state) => {
                state.genereCategoryListLoading = true;
                state.genereCategoryListError = null;
            })
            .addCase(genereCategoryThunk.fulfilled, (state, action) => {
                state.genereCategoryListLoading = false;
                state.genereCategoryListError = null;

                const { mediaType, genereCategoryList } = action.payload;
                const { results, total_pages, page } = genereCategoryList;

                // If it's page 1, replace results; otherwise append
                if (page === 1) {
                    state.genereCategoryData.results = results;
                } else {
                    state.genereCategoryData.results = [...state.genereCategoryData.results, ...results];
                }

                state.genereCategoryData.total_pages = total_pages;
                state.genereCategoryData.page = page;
            })
            .addCase(genereCategoryThunk.rejected, (state, action) => {
                state.genereCategoryListLoading = false;
                state.genereCategoryListError = action.payload;
            })
    }
})

export default genereCategorySlice.reducer;
export const { clearGenereCategoryList } = genereCategorySlice.actions;