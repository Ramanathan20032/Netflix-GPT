import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

export const genereListThunk = createAsyncThunk(
    'api/genereList',
    async ({ mediaType }, { rejectWithValue }) => {
        try {
            const GENERE_LIST_API = `${TMDB_BASE_URL}/genre/${mediaType}/list?language=IN`;
            const response = await fetch(GENERE_LIST_API, MOVIES_LISTING_API_OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`GENERE LIST DATA: ${mediaType} SUCCESSFULLY FETCHED`);
            return { mediaType, genereList: data };
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)