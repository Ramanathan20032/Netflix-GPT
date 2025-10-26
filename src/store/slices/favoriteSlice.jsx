import { createSlice } from "@reduxjs/toolkit";

const FAVORITES_STORAGE_KEY = "favoritesItems";

const loadInitialFavorites = () => {
    try {
        const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    } catch (err) {
        return [];
    }
};

const favoriteSlice = createSlice({
    name: "favorites",
    initialState: {
        favoritesItems: loadInitialFavorites()
    },
    reducers: {
        addFavoriteItem: (state, action) => {
            // Prevent duplicate by id
            if (!state.favoritesItems.some(item => item.id === action.payload.id)) {
                state.favoritesItems.push(action.payload);
                localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favoritesItems));
            }
        },
        removeFavoriteItem: (state, action) => {
            state.favoritesItems = state.favoritesItems.filter(
                item => item.id !== action.payload
            );
            localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favoritesItems));
        },
        clearFavoriteItem: (state) => {
            state.favoritesItems = [];
            localStorage.removeItem(FAVORITES_STORAGE_KEY);
        }
    }
});

export const { addFavoriteItem, removeFavoriteItem, clearFavoriteItem } = favoriteSlice.actions;
export default favoriteSlice.reducer;
