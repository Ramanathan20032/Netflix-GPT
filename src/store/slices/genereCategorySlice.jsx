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
                state.genereCategoryData = action.payload.genereCategoryList;
                state.genereCategoryListError = null;
            })
            .addCase(genereCategoryThunk.rejected, (state, action) => {
                state.genereCategoryListLoading = false;
                state.genereCategoryListError = action.payload;
            })
    }
})

export default genereCategorySlice.reducer;
export const { clearGenereCategoryList } = genereCategorySlice.actions;