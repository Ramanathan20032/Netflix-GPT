import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const genereCategoryThunk = createAsyncThunk(
    'api/genereCategoryList',
    async ({ genereId, mediaType, page = 1 }, { rejectWithValue }) => {
        try {
            const GENERE_CATEGORY_LIST_API = `https://api.themoviedb.org/3/discover/${mediaType}?language=en-IN&with_genres=${genereId}&page=${page}`;
            const response = await fetch(GENERE_CATEGORY_LIST_API, MOVIES_LISTING_API_OPTIONS);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("GENERE CATEGORY LIST DATA SUCCESSFULLY FETCHED");
            console.log(`GENERE CATEGORY LIST DATA: ${mediaType}`, data);
            return { mediaType, genereCategoryList: data };
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)