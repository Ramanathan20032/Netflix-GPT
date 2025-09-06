import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import moviesReducer from './slices/moviesListSlice'
import tvListReducer from './slices/tvListSlice'
import moviesDetailReducer from './slices/moviesDetailSlice'
import moviesSuggestionReducer from './slices/moviesSuggestionSlice'
import tvDetailReducer from './slices/tvDetailSlice'
import genereListReducer from './slices/genereListSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        tvList: tvListReducer,
        details: moviesDetailReducer,
        tvDetail: tvDetailReducer,
        suggestions: moviesSuggestionReducer,
        genereList: genereListReducer,
    }
})

export default appStore;