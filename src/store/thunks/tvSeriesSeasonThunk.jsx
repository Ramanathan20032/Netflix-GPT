import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

export const tvSeriesSeasonThunk = createAsyncThunk(
    'api/tvSeriesSeason',
    async ({ mediaType, tvId, seasonNumber }, { rejectWithValue }) => {
        try {
            const TV_SERIES_SEASON_API = `${TMDB_BASE_URL}/${mediaType}/${tvId}/season/${seasonNumber}?language=en-US`;
            const response = await fetch(TV_SERIES_SEASON_API, MOVIES_LISTING_API_OPTIONS);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            // console.log("TV SERIES SEASON DATA SUCCESSFULLY FETCHED");
            return data;
        }
        catch (error) {
            return rejectWithValue(error.message);
        }
    }
)

