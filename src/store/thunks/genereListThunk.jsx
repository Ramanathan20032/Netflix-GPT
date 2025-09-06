import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const genereListThunk = createAsyncThunk(
    'api/genereList',
    async ({ mediaType },{ rejectWithValue }) => {
        try {
            const GENERE_LIST_API = `https://api.themoviedb.org/3/genre/${mediaType}/list?language=IN`;
            const response = await fetch(GENERE_LIST_API, MOVIES_LISTING_API_OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log("GENERE LIST DATA SUCCESSFULLY FETCHED");
            console.log(`GENERE LIST DATA: ${mediaType}`, data);
            return { mediaType, genereList: data };
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)