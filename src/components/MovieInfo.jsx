import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Store Thunks
import { moviesDetailThunk } from "../store/thunks/moviesDetailThunk";
import { clearMovieDetails } from "../store/slices/moviesDetailSlice";

// Components
import LoadingSpinner from "./ui/LoadingSpinner";
import MovieInfoPage from "./MovieInfoPage";
import Error from "./Error";

const MovieInfo = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const { loading, error } = useSelector((store) => store?.details);
    console.log(`MovieDetails: ${movieId}`);

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
                <MovieInfoPage />
            )}
        </div>
    )
}

export default MovieInfo;