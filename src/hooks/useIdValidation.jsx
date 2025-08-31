import { useSelector } from "react-redux";

export const useIdValidation = (mediaType, movieId) => {
    // Get current listings to validate if the ID exists
    const { nowPlayingMovies, popularMovies, topRatedMovies, upcomingMovies, loading: moviesLoading } = useSelector((store) => store?.movies);
    const { airingTodayTv, onTheAirTv, popularTv, topRatedTv, tvLoading } = useSelector((store) => store?.tvList);

    // Check if the movieId exists in current listings
    const isIdValid = () => {
        if (mediaType === "movie") {
            const allMovies = [
                ...(nowPlayingMovies || []),
                ...(popularMovies || []),
                ...(topRatedMovies || []),
                ...(upcomingMovies || [])
            ];
            return allMovies.some(movie => movie.id.toString() === movieId);
        } else if (mediaType === "tv") {
            const allTvShows = [
                ...(airingTodayTv || []),
                ...(onTheAirTv || []),
                ...(popularTv || []),
                ...(topRatedTv || [])
            ];
            return allTvShows.some(tv => tv.id.toString() === movieId);
        }
        return false;
    };

    // Check if data is still loading
    const isLoading = mediaType === "movie" ? moviesLoading : tvLoading;

    // Check if we have any data loaded
    const hasData = mediaType === "movie"
        ? (nowPlayingMovies?.length > 0 || popularMovies?.length > 0 || topRatedMovies?.length > 0 || upcomingMovies?.length > 0)
        : (airingTodayTv?.length > 0 || onTheAirTv?.length > 0 || popularTv?.length > 0 || topRatedTv?.length > 0);

    return {
        isIdValid: isIdValid(),
        isLoading,
        hasData,
        // Only validate if we have data and not loading
        canValidate: hasData && !isLoading
    };
};
