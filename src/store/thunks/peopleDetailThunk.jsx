import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS, TMDB_BASE_URL } from "../../utils/constants";

// Helper function to fetch individual movie data
const fetchPeopleData = async (endpoint, personId) => {
    try {
        const MOVIE_DETAIL_API = `${TMDB_BASE_URL}/person/${personId}${endpoint}?language=en-US`;
        const response = await fetch(MOVIE_DETAIL_API, MOVIES_LISTING_API_OPTIONS);

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


export const peopleDetailThunk = createAsyncThunk(
    'api/peopleDetails',
    async (personId, { rejectWithValue }) => {
        try {
            // Fetch all people data in parallel
            const [
                details,
                externalIds,
                combineCredits,
            ] = await Promise.all([
                fetchPeopleData('', personId),
                fetchPeopleData('/external_ids', personId),
                fetchPeopleData('/combined_credits', personId),
            ]);

            // Return structured data
            const peopleData = {
                id: personId,
                details,
                externalIds,
                combineCredits,
            };

            console.log("PEOPLE DATA SUCCESSFULLY FETCHED");
            return peopleData;
        }
        catch (error) {
            console.error("Error in peopleDetailThunk:", error);
            return rejectWithValue(error.message);
        }
    }
)