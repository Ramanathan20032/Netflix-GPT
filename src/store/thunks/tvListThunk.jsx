import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";
import { createAsyncThunk } from "@reduxjs/toolkit";

const categoryMapping = {
    'airing_today': 'airingTodayTv',
    'on_the_air': 'onTheAirTv',
    'popular': 'popularTv',
    'top_rated': 'topRatedTv'
}

export const tvListThunk = createAsyncThunk(
    'api/tvList',
    async (category, { rejectWithValue }) => {
        try{
            const TV_LISTING_API = `https://api.themoviedb.org/3/tv/${category}?language=en-US&page=1`;
            const response = await fetch(TV_LISTING_API, MOVIES_LISTING_API_OPTIONS);

            if(!response.ok){
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("TV LISTING DATA SUCCESSFULLY FETCHED");
            return { category: categoryMapping[category], tvList: data.results };
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)