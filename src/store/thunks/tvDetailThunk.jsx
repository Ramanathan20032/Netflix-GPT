import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

// Helper function to fetch individual movie data
const fetchTvData = async (endpoint, tvId) => {
    try {
        const TV_DETAIL_API = `${TMDB_BASE_URL}/tv/${tvId}${endpoint}?language=en-US`;
        const response = await fetch(TV_DETAIL_API, MOVIES_LISTING_API_OPTIONS);

        if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
        return null;
    }
};

export const tvDetailThunk = createAsyncThunk(
    'api/tvDetail',
    async (tvId, { rejectWithValue }) => {
        try {
            // Fetch all tv data in parallel
            const [
                details,
                credits,
                images,
                recommendations,
                reviews,
                similar,
                translations,
                videos
            ] = await Promise.all([
                fetchTvData('', tvId),
                fetchTvData('/credits', tvId),
                fetchTvData('/images', tvId),
                fetchTvData('/recommendations', tvId),
                fetchTvData('/reviews', tvId),
                fetchTvData('/similar', tvId),
                fetchTvData('/translations', tvId),
                fetchTvData('/videos', tvId)
            ]);

            // Return structured data
            const tvData = {
                id: tvId,
                details,
                credits,
                images,
                recommendations,
                reviews,
                similar,
                translations,
                videos,
            };

            // console.log("ALL TV DATA SUCCESSFULLY FETCHED");
            return tvData;
        }
        catch (error) {
            console.error("Error in tvDetailThunk:", error);
            return rejectWithValue(error.message);
        }
    }
)