import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import moviesReducer from './slices/moviesListSlice'
import tvListReducer from './slices/tvListSlice'
import moviesDetailReducer from './slices/moviesDetailSlice'
import moviesSuggestionReducer from './slices/moviesSuggestionSlice'
import tvDetailReducer from './slices/tvDetailSlice'
import genereListReducer from './slices/genereListSlice'
import genereCategoryListReducer from './slices/genereCategorySlice'
import mediaCategorySlice from "./slices/mediaCategorySlice";
import peopleDetailReducer from "./slices/peopleDetailSlice";
import tvSeriesSeasonReducer from "./slices/tvSeriesSeasonSlice";
import multiSearchReducer from "./slices/multiSearchSlice"
import movieTrailerReducer from "./slices/movieTrailerSlice"

const appStore = configureStore({
    reducer: {
        user: userReducer,
        multiSearch: multiSearchReducer,
        movies: moviesReducer,
        tvList: tvListReducer,
        details: moviesDetailReducer,
        tvDetail: tvDetailReducer,
        suggestions: moviesSuggestionReducer,
        genereList: genereListReducer,
        genereCategoryList: genereCategoryListReducer,
        mediaCategory: mediaCategorySlice,
        PeopleDetail: peopleDetailReducer,
        tvSeriesSeason: tvSeriesSeasonReducer,
        movieTrailer: movieTrailerReducer
    }
})

export default appStore;