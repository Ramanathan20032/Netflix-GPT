import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

// Store Thunks
import { moviesDetailThunk } from "../store/thunks/moviesDetailThunk";
import { tvDetailThunk } from "../store/thunks/tvDetailThunk";

// Hooks
import { useIdValidation } from "../hooks/useIdValidation";

// Components
import Error from "./Error";
import MovieCarouselCard from "./MovieCarouselCard";
import LoadingSpinner from "./ui/LoadingSpinner";
import InvalidIdError from "./ui/InvalidIdError";

const CastCrewList = () => {
    const { mediaType, movieId, type } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Get data from store
    const { movieCredits, loading, error } = useSelector((store) => store?.details);
    const { tvCredits, tvLoading, tvError } = useSelector((store) => store?.tvDetail);

    // Use the custom hook for ID validation
    const { isIdValid, canValidate } = useIdValidation(mediaType, movieId);

    // Determine which data to use based on mediaType
    const credits = mediaType === "movie" ? movieCredits : tvCredits;
    const isLoading = mediaType === "movie" ? loading : tvLoading;
    const hasError = mediaType === "movie" ? error : tvError;

    const people = type === "cast" ? credits?.cast : credits?.crew;

    useEffect(() => {
        // Validate mediaType
        if (mediaType !== "movie" && mediaType !== "tv") {
            navigate("/error");
            return;
        }

        // Validate type parameter
        if (type !== "cast" && type !== "crew") {
            navigate("/error");
            return;
        }

        // Check if the ID exists in current listings (only when we can validate)
        if (canValidate && !isIdValid) {
            console.warn(`Invalid ${mediaType} ID: ${movieId} - not found in current listings`);
        }

        // Fetch data if not already loaded
        if (!credits) {
            if (mediaType === "movie") {
                dispatch(moviesDetailThunk(movieId));
            } else {
                dispatch(tvDetailThunk(movieId));
            }
        }
    }, [dispatch, movieId, mediaType, type, credits, navigate, isIdValid, canValidate]);

    // Early return for invalid media type or type
    if (mediaType !== "movie" && mediaType !== "tv") {
        return <Error />;
    }

    if (type !== "cast" && type !== "crew") {
        return <Error />;
    }

    return (
        <div className="min-h-screen bg-black">
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">
                <h1 className="text-gray-100 text-base md:text-xl font-bold mb-4 md:mb-6 mt-2 md:mt-4 tracking-wider">
                    {type?.toUpperCase()} - {mediaType?.toUpperCase()}
                </h1>

                {isLoading ? (
                    <div className="flex justify-center items-center h-screen">
                        <LoadingSpinner />
                    </div>
                ) : hasError ? (
                    // Show custom error for invalid ID instead of generic Error component
                    <InvalidIdError mediaType={mediaType} movieId={movieId} />
                ) : people && people.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-7 gap-4 md:gap-5">
                        {people.map((person) => (
                            <div key={person.id} className="aspect-[2/3] w-full">
                                <MovieCarouselCard movie={person} mediaType={mediaType} />
                            </div>
                        ))}
                    </div>
                ) : (
                    // No results
                    <div className="text-center py-6 md:py-12 bg-white/15 text-white px-3 py-1 rounded-md">
                        <p className="text-white/400 text-md md:text-xl font-medium">No {type} found</p>
                    </div>
                )}
            </div>
        </div>
    )
}

export default CastCrewList;