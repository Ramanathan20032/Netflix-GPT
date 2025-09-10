import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const mediaCategoryThunk = createAsyncThunk(
    'api/mediaCategory',
    async ({ mediaType, endPoint, page = 1 }, { rejectWithValue }) => {
        try {
            const MEDIA_CATEGORY_API = `https://api.themoviedb.org/3/${mediaType}/${endPoint}?language=en-US&page=${page}`;
            const response = await fetch(MEDIA_CATEGORY_API, MOVIES_LISTING_API_OPTIONS);
            
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`MEDIA CATEGORY DATA SUCCESSFULLY FETCHED ${endPoint}`, data);
            return { mediaType, mediaCategory: data, page };
        }
        catch (error) {
            console.error('Error in mediaCategoryThunk:', error.message);
            return rejectWithValue(error.message);
        }
    }
)