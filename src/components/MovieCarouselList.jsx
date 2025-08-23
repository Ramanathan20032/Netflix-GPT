import MovieCarouselCard from "./MovieCarouselCard";
import ShimmerMovieCard from "./ShimmerMovieCard";

const MovieCarouselList = ({ title, moviesData, isLoading = false }) => {
    console.log(moviesData);
    // Early return if no data and not loading
    if (!isLoading && (!moviesData || moviesData?.length === 0)) return null;

    return (
        <div className="mb-10">
            <div className="text-white hover:text-gray-400 flex items-center gap-2 px-1.5 mb-4 cursor-pointer w-[fit-content] group">
                <h1 className="text-2xl font-bold">{title}</h1>
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="relative">
                <div className="flex overflow-x-scroll scrollbar-hide gap-5 px-1 py-3">
                    {isLoading ? (
                        // Show 8 shimmer cards while loading
                        Array.from({ length: 8 }).map((_, index) => (
                            <div key={index} className="flex-shrink-0">
                                <ShimmerMovieCard />
                            </div>
                        ))
                    ) : (
                        // Show actual movie cards when data is available
                        moviesData?.map((movie) => (
                            <div key={movie?.id} className="flex-shrink-0">
                                <MovieCarouselCard movie={movie} />
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    )
}

export default MovieCarouselList;