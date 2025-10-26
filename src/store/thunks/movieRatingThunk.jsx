import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrCreateGuestSession } from "../../utils/tmdbSession"; // make sure path is correct
import { tmdbApi, TMDB_ACCESS_TOKEN } from "../../utils/constants";

export const movieRatingThunk = createAsyncThunk(
  "api/movieRating",
  async ({ mediaType, movieId, value }, { rejectWithValue }) => {
    try {
      const sessionId = await getOrCreateGuestSession(TMDB_ACCESS_TOKEN);

      // ! Option 1: Using params (RECOMMENDED - cleaner and more readable)
      const response = await tmdbApi.post(
        `/${mediaType}/${movieId}/rating`,
        { value }, // request body data
        { params: { guest_session_id: sessionId } } // query params: ?guest_session_id=xxxxx
      );

      // ! Option 2: You could also put it directly in the URL
      // const response = await tmdbApi.post(
      //   `/${mediaType}/${movieId}/rating?guest_session_id=${sessionId}`,
      //   { value }
      // );

      if (!response.data.success) {
        throw new Error(response.data.status_message || "Failed to rate movie");
      }

      return { movieId, value, message: response.data.status_message };

    } catch (error) {
      return rejectWithValue(error.response?.data?.status_message || error.message);
    }
  }
);
