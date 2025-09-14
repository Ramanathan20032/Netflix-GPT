import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Store Thunks
import { moviesDetailThunk } from "../store/thunks/moviesDetailThunk";
import { clearMovieDetails } from "../store/slices/moviesDetailSlice";
import { tvDetailThunk } from "../store/thunks/tvDetailThunk";
import { clearTvDetail } from "../store/slices/tvDetailSlice";

// Components
import LoadingSpinner from "./ui/LoadingSpinner";
import MovieInfoPage from "./movieDetailsPage/MovieInfoPage";
import Error from "./Error";

const MovieInfo = () => {
    const { mediaType, movieId } = useParams();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store?.details);
    const { tvLoading, tvError } = useSelector((store) => store?.tvDetail);

    useEffect(() => {
        // Fetch movie details when component mounts
        if (mediaType === "movie" ? dispatch(moviesDetailThunk(movieId)) : dispatch(tvDetailThunk(movieId)));
        // Cleanup: clear details when component unmounts
        // return () => {
        //     if (mediaType === "movie" ? dispatch(clearMovieDetails()) : dispatch(clearTvDetail()));
        // };
    }, [dispatch, movieId]);

    // Helper function to render content based on state
    const renderContent = (isLoading, hasError) => {
        if (isLoading) return <LoadingSpinner />;
        if (hasError) return <Error />;
        return <MovieInfoPage mediaType={mediaType} />;
    };

    // Early return for invalid media type
    if (mediaType !== "movie" && mediaType !== "tv") {
        return <Error />;
    }

    return (
        <div className="text-white">
            {mediaType === "movie"
                ? renderContent(loading, error)
                : renderContent(tvLoading, tvError)
            }
        </div>
    )
}

export default MovieInfo;