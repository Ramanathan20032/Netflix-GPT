import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import moviesReducer from './slices/moviesListSlice'
import moviesDetailReducer from './slices/moviesDetailSlice'

const appStore = configureStore({
    reducer: {
        user: userReducer,
        movies: moviesReducer,
        details: moviesDetailReducer,
    }
})

export default appStore;