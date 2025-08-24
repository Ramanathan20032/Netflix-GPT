import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { moviesDetailThunk } from "../store/thunks/moviesDetailThunk";
import LoadingSpinner from "./LoadingSpinner";
import MovieInfoPage from "./MovieInfoPage";
import Error from "./Error";
import { clearMovieDetails } from "../store/slices/moviesDetailSlice";

const MovieInfo = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const {
        movieDetails,
        movieCredits,
        movieImages,
        movieLists,
        movieRecommendations,
        movieReleaseDates,
        movieReviews,
        movieSimilar,
        movieTranslations,
        movieWatchProviders,
        movieVideos,
        loading,
        error
    } = useSelector((store) => store?.details);
    console.log(`MovieDetails: ${movieId}`, movieDetails);

    useEffect(() => {
        // Fetch movie details when component mounts
        dispatch(moviesDetailThunk(movieId));

        // Cleanup: clear details when component unmounts
        return () => {
            dispatch(clearMovieDetails());
        };
    }, [dispatch, movieId]);

    return (
        <div className="text-white">
            {loading ? (
                <LoadingSpinner />
            ) : error ? (
                <Error />
            ) : (
                <MovieInfoPage
                    movieDetails={movieDetails}
                    movieCredits={movieCredits}
                    movieImages={movieImages}
                    movieLists={movieLists}
                    movieRecommendations={movieRecommendations}
                    movieReleaseDates={movieReleaseDates}
                    movieReviews={movieReviews}
                    movieSimilar={movieSimilar}
                    movieTranslations={movieTranslations}
                    movieWatchProviders={movieWatchProviders}
                    movieVideos={movieVideos}
                />
            )}
        </div>
    )
}

export default MovieInfo;