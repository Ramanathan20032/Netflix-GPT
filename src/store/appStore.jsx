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

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        tvList: tvListReducer,
        details: moviesDetailReducer,
        tvDetail: tvDetailReducer,
        suggestions: moviesSuggestionReducer,
        genereList: genereListReducer,
        genereCategoryList: genereCategoryListReducer,
        mediaCategory: mediaCategorySlice,
        PeopleDetail: peopleDetailReducer,
    }
})

export default appStore;