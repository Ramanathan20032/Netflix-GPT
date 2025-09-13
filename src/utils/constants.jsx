export const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/'

// export const MOVIES_LISTING_API = 'https://api.themoviedb.org/3/movie/now_playing?page=1';

export const MOVIES_LISTING_API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzZTBkY2QxMTMxZDY4YTYzODc4NzQyYzc3ZWZmZTI4YyIsIm5iZiI6MTc1NDkwNDk0MS44MzM5OTk5LCJzdWIiOiI2ODk5Yjk2ZGI3N2E2ZmY0OTM1ZDEyZjAiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.P_KRZMd9AIulqHnn6LKV0u7or_BXc81C6LF3aS3kfSE'
  }
};


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