import MovieCarouselCard from "./MovieCarouselCard";

const MovieCarouselList = ({ title, moviesData }) => {
    if (!moviesData || moviesData.length === 0) return null;

    return (
        <div className="mb-10">
            <div className="text-white hover:text-gray-400 flex items-center gap-2 px-1.5 mb-4 cursor-pointer w-[fit-content] group">
                <h1 className="text-2xl font-bold">{title}</h1>
                <svg className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
            <div className="relative">
                <div className="flex overflow-x-scroll scrollbar-hide gap-4 px-1 py-3">
                    {moviesData.map((movie) => (
                        <div key={movie.id} className="flex-shrink-0">
                            <MovieCarouselCard movie={movie} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieCarouselList;