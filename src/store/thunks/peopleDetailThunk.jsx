import { createAsyncThunk } from "@reduxjs/toolkit";
import { MOVIES_LISTING_API_OPTIONS } from "../../utils/constants";

// Helper function to fetch individual movie data
const fetchPeopleData = async (endpoint, personId) => {
    try {
        const MOVIE_DETAIL_API = `https://api.themoviedb.org/3/person/${personId}${endpoint}?language=en-US`;
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
                moviesCredits,
                tvCredits,
                images,
                taggedImages
            ] = await Promise.all([
                fetchPeopleData('', personId),
                fetchPeopleData('/external_ids', personId),
                fetchPeopleData('/combined_credits', personId),
                fetchPeopleData('/movie_credits', personId),
                fetchPeopleData('/tv_credits', personId),
                fetchPeopleData('/images', personId),
                fetchPeopleData('/tagged_images', personId),
            ]);

            // Return structured data
            const peopleData = {
                id: personId,
                details,
                externalIds,
                combineCredits,
                moviesCredits,
                tvCredits,
                images,
                taggedImages,
            };

            console.log("PEOPLE DATA SUCCESSFULLY FETCHED:", peopleData);
            return peopleData;
        }
        catch (error) {
            console.error("Error in peopleDetailThunk:", error);
            return rejectWithValue(error.message);
        }
    }
)