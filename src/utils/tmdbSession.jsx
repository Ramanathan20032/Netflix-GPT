import { TMDB_V3_API_KEY } from "./constants";
const TMDB_GUEST_SESSION_KEY = "tmbd_guest_session_id";

export async function getOrCreateGuestSession() {
    let sessionId = localStorage.getItem(TMDB_GUEST_SESSION_KEY);
    if (sessionId) return sessionId;

    const response = await fetch(
        `https://api.themoviedb.org/3/authentication/guest_session/new?api_key=${TMDB_V3_API_KEY}`
    );

    const data = await response.json();

    if (data.success && data.guest_session_id) {
        localStorage.setItem(TMDB_GUEST_SESSION_KEY, data.guest_session_id);
        return data.guest_session_id;
    }

    throw new Error("Unable to get guest session ID from TMDB");
}
