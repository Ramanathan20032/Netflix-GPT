import { createSlice } from "@reduxjs/toolkit";
import { peopleDetailThunk } from "../thunks/peopleDetailThunk";

const peopleDetailSlice = createSlice({
    name: "peopleDetails",
    initialState: {
        peopleData: [],
        peopleDetailLoading: false,
        peopleDetailError: null,
    },
    reducers: {
        clearPeopleData: (state) => {
            state.peopleData = [];
            state.peopleDetailLoading = false;
            state.peopleDetailError = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(peopleDetailThunk.pending, (state) => {
                state.peopleDetailLoading = true;
                state.peopleDetailError = null;
            })
            .addCase(peopleDetailThunk.fulfilled, (state, action) => {
                state.peopleData = action.payload;
                state.peopleDetailLoading = false;
                state.peopleDetailError = null;
            })
            .addCase(peopleDetailThunk.rejected, (state, action) => {
                state.peopleDetailLoading = false;
                state.peopleDetailError = action.payload;
            })
    }
})

export const { clearPeopleData } = peopleDetailSlice.actions;
export default peopleDetailSlice.reducer;