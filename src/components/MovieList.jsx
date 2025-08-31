import { useParams } from "react-router-dom";

// Hooks
import { useInfiniteMovies } from "../hooks/useInfiniteMovies";

// Components
import ShimmerMovieCard from "./ui/ShimmerMovieCard";
import Error from "./Error";
import MovieCarouselCard from "./MovieCarouselCard";

const MovieList = () => {
    const { type, movieId, mediaType } = useParams();
    const { results, page, total_pages, loaderRef, loading, error } = useInfiniteMovies({
        type: type,
        mediaType: mediaType,
        movieId: movieId
    });

    console.log("MovieList render:", { results, page, total_pages, loading, error });

    return (
        <div className="min-h-screen bg-black">
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">
                <h1 className="text-gray-100 text-base md:text-xl font-bold mb-4 md:mb-6 mt-2 md:mt-4 tracking-wider">
                    {type?.toUpperCase()} {mediaType?.toUpperCase()}
                </h1>

                {loading && page === 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0">
                                <ShimmerMovieCard />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    <Error />
                ) : results && results.length > 0 ? (
                    // Results with infinite scroll
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                            {results.map((movie) => (
                                <MovieCarouselCard key={movie.id} movie={movie} />
                            ))}
                        </div>

                        {/* Infinite scroll loader - positioned outside the grid */}
                        {page < total_pages && (
                            <div className="mt-8">
                                <div ref={loaderRef} className="w-full">
                                    {loading ? (
                                        // Show shimmer cards while loading more content
                                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                                            {Array.from({ length: 14 }).map((_, index) => (
                                                <div key={`shimmer-${index}`} className="flex-shrink-0">
                                                    <ShimmerMovieCard />
                                                </div>
                                            ))}
                                        </div>
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

export default MovieList;
