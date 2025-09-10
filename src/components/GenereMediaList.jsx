import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import usePaginatedFetch from "../hooks/usePaginatedFetch";
import { clearGenereCategoryList } from "../store/slices/genereCategorySlice";
import { getGenreName } from "../utils/constants";
import ShimmerMovieCard from "./ui/ShimmerMovieCard";
import MovieCarouselCard from "./MovieCarouselCard";
import InvalidIdError from "./ui/InvalidIdError";

const GenereMediaList = () => {
    const { genereId, mediaType, type } = useParams();
    const { results, page, total_pages, total_results, loaderRef, loading, error } = usePaginatedFetch({ genereId, mediaType });
    const dispatch = useDispatch();

    // Get genre lists from Redux store
    const { movieGenereList } = useSelector((store) => store.genereList.movie);
    const { tvGenereList } = useSelector((store) => store.genereList.tv);
    const mediaGenereData = mediaType === "movie" ? movieGenereList : tvGenereList;

    // Get genre name from ID
    const genreName = getGenreName(genereId, mediaGenereData);

    // console.log(genereId, mediaType, type);
    // console.log('Genre Name:', genreName);
    // console.log('Available Genres:', mediaGenereData);

    useEffect(() => {
        return () => {
            dispatch(clearGenereCategoryList());
        }
    }, [dispatch]);

    return (
        <div className="min-h-screen bg-black">
            <div className="w-full mx-auto px-7 sm:px-8 md:px-12 py-8">
                {/* Only show header when NOT in error state */}
                {!error && (
                    <h1 className="text-gray-100 text-base md:text-xl font-bold mb-4 md:mb-6 mt-2 md:mt-4 tracking-wider">
                        {genreName.toUpperCase()} {mediaType?.toUpperCase()}  
                    </h1>
                )}

                {loading && page === 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                        {Array.from({ length: 20 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0">
                                <ShimmerMovieCard />
                            </div>
                        ))}
                    </div>
                ) : error ? (
                    // Show custom error for invalid ID instead of generic Error component
                    <InvalidIdError mediaType={mediaType} movieId={genereId} />
                ) : results && results.length > 0 ? (
                    // Results with infinite scroll
                    <>
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 md:gap-5">
                            {results.map((movie) => (
                                <MovieCarouselCard key={movie.id} movie={movie} mediaType={mediaType} />
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
    )
}

export default GenereMediaList;