import { useNavigate } from "react-router-dom";
import MovieCarouselCard from "./MovieCarouselCard";
import ShimmerMovieCard from "./ui/ShimmerMovieCard";
import MovieInfoDetailCarouselCard from "./profileDetailPage/MovieInfoDetailCarouselCard";

const MovieCarouselList = ({ title, moviesData, isLoading = false, type, movieId, mediaType, endPoint }) => {
    const navigate = useNavigate();
    const hasData = moviesData && moviesData.length > 0

    const handleNavigate = () => {
        if (type === "recommendations" || type === "similar") {
            navigate(`/${mediaType}/${movieId}/suggestions/${type}`);
        } else if (type === "cast" || type === "crew") {
            navigate(`/${mediaType}/${movieId}/people/${type}`);
        } else if (type === "category") {
            navigate(`/${mediaType}/${type}/${endPoint}`);
        }
    }

    return (
        <div className="mb-10">
            {/* Header section */}
            {hasData && (
                type === "infoDetailCast" || type === "infoDetailCrew" ? (
                    // For infoDetail, show title without arrow and no click
                    <div className="text-white px-1 mb-4">
                        <h1 className="text-2xl font-bold">{title}</h1>
                    </div>
                ) : (
                    // For other types, show title with arrow and click functionality
                    <div
                        className="text-white hover:text-gray-400 flex items-center gap-2 px-1 mb-4 cursor-pointer w-fit group"
                        onClick={handleNavigate}
                    >
                        <h1 className="text-2xl font-bold">{title}</h1>
                        <svg
                            className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fillRule="evenodd"
                                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </div>
                )
            )}

            {/* Content Section */}
            <div className="relative">
                {isLoading ? (
                    // ? Loading shimmer
                    <div className="flex overflow-x-scroll scrollbar-hide gap-5 px-1 py-3">
                        {Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0">
                                <ShimmerMovieCard />
                            </div>
                        ))}
                    </div>
                ) : !moviesData || moviesData.length === 0 ? (
                    // ? No results
                    // <div className="text-center py-6 md:py-12 bg-white/15 text-white px-3 py-1 rounded-md">
                    //     <p className="text-white/400 text-md md:text-xl font-medium">No {type} movies found</p>
                    // </div>
                    null
                ) : (
                    // ? Movies list
                    <div className="flex overflow-x-scroll scrollbar-hide gap-5 px-1 py-3">
                        {type === "infoDetailCast" || type === "infoDetailCrew" ? (
                            // For infoDetail, New MovieCarouselCard Component
                            moviesData.map((movie, index) => {
                                const uniqueKey = `${movie?.id || 'unknown'}-${index}-${movie?.credit_id || movie?.character || movie?.job || ''}`;
                                return (
                                    <div key={uniqueKey} className="flex-shrink-0">
                                        <MovieInfoDetailCarouselCard movie={movie} type={type} />
                                    </div>
                                );
                            })
                        ) : (
                            // For other types, general MovieCarouselCard Component
                            moviesData.map((movie, index) => {
                                const uniqueKey = `${movie?.id || 'unknown'}-${index}-${movie?.credit_id || movie?.character || movie?.job || ''}`;
                                return (
                                    <div key={uniqueKey} className="flex-shrink-0">
                                        <MovieCarouselCard movie={movie} mediaType={mediaType} />
                                    </div>
                                );
                            })
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MovieCarouselList;