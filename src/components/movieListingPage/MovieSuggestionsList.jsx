import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";

// Hooks
import { useInfiniteMovies } from "../../hooks/useInfiniteMovies";
import { useIdValidation } from "../../hooks/useIdValidation";

// Components
import ShimmerMovieCard from "../ui/ShimmerMovieCard";
import Error from "../Error";
import MovieCarouselCard from "../MovieCarouselCard";
import LoadingSpinner from "../ui/LoadingSpinner";
import InvalidIdError from "../ui/InvalidIdError";

// ! Movie Suggestions List for both recommendations and similar listings
const MovieSuggestionsList = () => {
    const { type, movieId, mediaType } = useParams();
    const navigate = useNavigate();

    // Use the custom hook for ID validation
    const { isIdValid, canValidate } = useIdValidation(mediaType, movieId);

    const { results, page, total_pages, loaderRef, loading, error } = useInfiniteMovies({
        type: type,
        mediaType: mediaType,
        movieId: movieId
    });

    useEffect(() => {
        // Validate mediaType
        if (mediaType !== "movie" && mediaType !== "tv") {
            navigate("/error");
            return;
        }

        // Validate type parameter
        if (type !== "recommendations" && type !== "similar") {
            navigate("/error");
            return;
        }

        // Check if the ID exists in current listings (only when we can validate)
        if (canValidate && !isIdValid) {
            console.warn(`Invalid ${mediaType} ID: ${movieId} - not found in current listings`);
        }
    }, [mediaType, type, navigate, movieId, isIdValid, canValidate]);

    // Early return for invalid parameters
    if (mediaType !== "movie" && mediaType !== "tv") {
        return <Error />;
    }

    if (type !== "recommendations" && type !== "similar") {
        return <Error />;
    }

    // console.log("MovieList render:", { results, page, total_pages, loading, error });

    return (
        <div className="min-h-screen bg-black">
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8 pt-24 md:pt-28">
                {/* Only show header when NOT in error state */}
                {!error && (
                    <h1 className="text-gray-100 text-base md:text-xl font-bold mb-4 md:mb-6 mt-2 md:mt-4 tracking-wider">
                        {type?.toUpperCase()} {mediaType?.toUpperCase()}
                    </h1>
                )}

                {loading && page === 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <ShimmerMovieCard key={index} />
                        ))}
                    </div>
                ) : error ? (
                    // Show custom error for invalid ID instead of generic Error component
                    <InvalidIdError mediaType={mediaType} movieId={movieId} />
                ) : results && results.length > 0 ? (
                    // Results with infinite scroll
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                            {results.map((movie, index) => {
                                // Create unique key for movie suggestions
                                const uniqueKey = `${movie.id}-${index}-${movie.media_type || mediaType || 'suggestion'}`;
                                return (
                                    <MovieCarouselCard key={uniqueKey} movie={movie} mediaType={mediaType} />
                                );
                            })}
                        </div>

                        {/* Infinite scroll loader - positioned outside the grid */}
                        {page < total_pages && (
                            <div className="mt-8">
                                <div ref={loaderRef} className="w-full">
                                    {loading ? (
                                        // Show shimmer cards while loading more content
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                                            {Array.from({ length: 14 }).map((_, index) => (
                                                <ShimmerMovieCard key={`shimmer-${index}`} />
                                            ))}
                                        </div>
                                        // <LoadingSpinner />
                                    ) : (
                                        // Invisible loader for intersection observer
                                        <div className="h-1 sm:h-2 bg-transparent rounded"></div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    // No results
                    <div className="text-center py-6 md:py-12 bg-white/15 text-white px-3 py-1 rounded-md">
                        <p className="text-white/400 text-md md:text-xl font-medium">No {type} movies found</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MovieSuggestionsList;
