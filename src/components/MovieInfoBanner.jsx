import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, formatRuntime, formatDate, getRatingColor } from "../utils/constants";
import StarRating from "./ui/StarRating";

const MovieInfoBannerPage = () => {
    const { movieDetails } = useSelector((store) => store?.details);
    if (!movieDetails) return null;

    return (
        <>
            {/* Hero Section with Backdrop */}
            <div className="relative h-[70vh] sm:h-[80vh] lg:h-[100vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: movieDetails?.backdrop_path
                            ? `url(${IMAGE_BASE_URL}original${movieDetails?.backdrop_path})`
                            : 'linear-gradient(to right, #1a1a1a, #2a2a2a)'
                    }}
                >
                    <div className="absolute inset-0 bg-[linear-gradient(to_top,black,rgba(0,0,0,0.6),transparent),linear-gradient(to_right,rgba(0,0,0,0.7),transparent)]"></div>
                </div>

                {/* Movie Info Overlay */}
                <div className="absolute bottom-10 left-0 px-5 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto">
                        {/* Title and Tagline */}
                        <div>
                            {movieDetails?.title && (
                                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                                    {movieDetails?.title || movieDetails?.original_title}
                                </h1>
                            )}
                            {movieDetails?.tagline && (
                                <p className="text-xl md:text-xl text-gray-300 mb-5 italic">
                                    "{movieDetails?.tagline}"
                                </p>
                            )}
                        </div>

                        {/* Movie Stats */}
                        <div className="flex flex-wrap items-center gap-4 mb-5 text-sm md:text-base">
                            {movieDetails?.release_date && (
                                <span className="text-gray-300">
                                    {`${formatDate(movieDetails?.release_date)}` || 'TBA'}
                                </span>
                            )}
                            {/* [movieDetails?.runtime != null] --> check for [movieDetails?.runtime!== null && movieDetails?.runtime!== undefined] */}
                            {movieDetails?.runtime != null && (
                                <span className="text-gray-300">
                                    {formatRuntime(movieDetails?.runtime) || 'TBA'}
                                </span>
                            )}
                            {movieDetails?.adult && (
                                <span className="bg-red-600 text-white px-2 py-1 rounded text-xs sm:text-sm">
                                    TV-MA
                                    {/* {movieDetails?.adult ? '18+' : '13+'} */}
                                </span>
                            )}
                            {movieDetails?.status && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                                    {movieDetails?.status}
                                </span>
                            )}
                        </div>

                        {/* Rating and Popularity */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {movieDetails?.vote_average != null && (
                                <div className="flex items-center gap-3">
                                    <StarRating rating={movieDetails?.vote_average} />
                                    <div>
                                        <span className={`font-semibold ${getRatingColor(movieDetails?.vote_average)}`}>
                                            {movieDetails?.vote_average.toFixed(1)}
                                        </span>
                                        {movieDetails?.vote_count != null && (
                                            <span className="text-gray-400 text-sm ml-1">
                                                ({movieDetails?.vote_count.toLocaleString()} votes)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {movieDetails?.popularity != null && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300 font-medium">
                                        {Math.round(movieDetails?.popularity)} Popularity
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {movieDetails?.genres && movieDetails?.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5.5">
                                {movieDetails?.genres.map((genre, index) => (
                                    <span
                                        key={genre.id || index}
                                        className="bg-white/15 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                                    >
                                        {`${genre.name}`}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {movieDetails?.overview && (
                            <p className="text-gray-300 text-lg max-w-3xl leading-relaxed line-clamp-2">
                                {movieDetails?.overview}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfoBannerPage; 