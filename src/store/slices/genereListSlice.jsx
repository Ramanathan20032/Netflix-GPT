import { createSlice } from "@reduxjs/toolkit";
import { genereListThunk } from "../thunks/genereListThunk";

const genereListSlice = createSlice({
    name: "genereList",
    initialState: {
        genereListLoading: false,
        genereListError: null,
        movie: {
            movieGenereList: []
        },
        tv: {
            tvGenereList: []
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(genereListThunk.pending, (state) => {
                state.genereListLoading = true;
                state.genereListError = null;
            })
            .addCase(genereListThunk.fulfilled, (state, action) => {
                state.genereListLoading = false;
                if (action.payload.mediaType === 'movie') {
                    state.movie.movieGenereList = action.payload.genereList.genres;
                } else if (action.payload.mediaType === 'tv') {
                    state.tv.tvGenereList = action.payload.genereList.genres;
                }
                state.genereListError = null;
            })
            .addCase(genereListThunk.rejected, (state, action) => {
                state.genereListLoading = false;
                state.genereListError = action.payload;
            })
    }
})

export default genereListSlice.reducer;