import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

export const multiSearchThunk = createAsyncThunk(
    'api/search',
    async({query}, {rejectWithValue}) => {
        try{
            const MULTI_SEARCH_API = `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`;
            const response = await fetch(MULTI_SEARCH_API, MOVIES_LISTING_API_OPTIONS);
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            console.log(`SEARCH API DATA SUCCESSFULLY FETCHED`, data);
            return data;
        }
        catch(error){
            return rejectWithValue(error.message);
        }
    }
)