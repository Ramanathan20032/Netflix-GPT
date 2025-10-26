import axios from 'axios';

export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

// ? TMDB API Base URL (from environment variables)
export const TMDB_BASE_URL = import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3';
// ? TMDB_API_KEY (from environment variables)
export const TMDB_V3_API_KEY = import.meta.env.VITE_TMDB_V3_API_KEY;
// ? TMDB_ACCESS_TOKEN (from environment variables)
export const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

// ? Create axios instance with default config
export const tmdbApi = axios.create({
  baseURL: TMDB_BASE_URL,
  timeout: 10000, // 10 seconds timeout
  headers: {
    'accept': 'application/json',
    'Authorization': `Bearer ${TMDB_ACCESS_TOKEN}`,
    'Content-Type': 'application/json'
  }
});

// ? Usage Examples:
// ? GET Request:  const response = await tmdbApi.get('/endpoint?param=value');
// ? POST Request: const response = await tmdbApi.post('/endpoint', { data: 'value' });
// ? PUT Request:  const response = await tmdbApi.put('/endpoint', { data: 'value' });
// ? DELETE Request: const response = await tmdbApi.delete('/endpoint');

// ? Legacy fetch options (kept for backward compatibility)
export const MOVIES_LISTING_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`
  }
};

export const TMDB_POST_API_OPTION = {
  method: "POST",
  headers: {
    accept: "application/json",
    "Content-Type": "application/json;charset=utf-8",
    Authorization: `Bearer ${TMDB_ACCESS_TOKEN}`, // use Bearer header
  },
}


// ? Format Runtime
export const formatRuntime = (minutes) => {
  if (!minutes) return '';
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
};

// ? Format Date
export const formatDate = (dateString) => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// ? Get Rating Color
export const getRatingColor = (rating) => {
  if (!rating) return 'text-gray-400';
  if (rating >= 7) return 'text-green-400';
  if (rating >= 5) return 'text-yellow-400';
  return 'text-red-400';
};

// ? Get Genre Name from ID
export const getGenreName = (genreId, genreList) => {
  if (!genreId) return null;
  if (!genreList || !Array.isArray(genreList) || genreList.length === 0) return null; // Return null during loading
  const genre = genreList.find(g => g.id === parseInt(genreId));
  return genre ? genre.name : 'Unknown Genre';
};

// ? To find the Media Type
export const findMediaType = (detail) => {
  if (!detail) return 'unknown';
  if ('first_air_date' in detail || 'original_name' in detail) return 'tv';
  else if ('release_date' in detail || 'original_title' in detail) return 'movie';
  else return 'unknown';
};
