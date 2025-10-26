import { createAsyncThunk } from "@reduxjs/toolkit";
import { getOrCreateGuestSession } from "../../utils/tmdbSession"; // make sure path is correct
import { TMDB_ACCESS_TOKEN, TMDB_POST_API_OPTION } from "../../utils/constants";

export const movieRatingThunk = createAsyncThunk(
  "api/movieRating",
  async ({ mediaType, movieId, value }, { rejectWithValue }) => {
    try {
      const sessionId = await getOrCreateGuestSession(TMDB_ACCESS_TOKEN);

      const response = await fetch(
        `https://api.themoviedb.org/3/${mediaType}/${movieId}/rating?guest_session_id=${sessionId}`,
        {
            // ? TMDB_POST_API_OPTION,
            ...TMDB_POST_API_OPTION,
          body: JSON.stringify({ value }), // value must be between 0.5 and 10.0
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.status_message || "Failed to rate movie");
      }

    //   if (data.success) {
    //     alert("Rated successfully!");
    //   } else {
    //     alert(data.status_message || "Failed to rate.");
    //   }
    //   console.log("Rating Value", value);
    
      return { movieId, value, message: data.status_message };
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
