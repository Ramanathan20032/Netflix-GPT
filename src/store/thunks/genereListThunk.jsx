import { createAsyncThunk } from "@reduxjs/toolkit";
import { tmdbApi } from "../../utils/constants";

export const genereListThunk = createAsyncThunk(
    'api/genereList',
    async ({ mediaType }, { rejectWithValue }) => {
        try {
            const response = await tmdbApi.get(`/genre/${mediaType}/list?language=IN`);
            // console.log(`GENERE LIST DATA: ${mediaType} SUCCESSFULLY FETCHED`);
            return { mediaType, genereList: response.data };
        }
        catch (error) {
            return rejectWithValue(error.response?.data?.status_message || error.message);
        }
    }
)