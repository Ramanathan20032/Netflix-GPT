import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { moviesDetailThunk } from "../store/thunks/moviesDetailThunk";
import LoadingSpinner from "./LoadingSpinner";
import MovieInfoPage from "./MovieInfoPage";

const MovieInfo = () => {
    const { movieId } = useParams();
    const dispatch = useDispatch();
    const { movieDetails, loading, error } = useSelector((store) => store?.details);
    console.log(`MovieDetails: ${movieId}`, movieDetails);

    useEffect(() => {
        dispatch(moviesDetailThunk(movieId));
    }, [dispatch, movieId]);

    return (
        <div className="text-white">
            {loading ? <LoadingSpinner /> : (
                <MovieInfoPage movieDetails={movieDetails} />
            )}
            {error && <Error />}
        </div>
    )
}

export default MovieInfo;