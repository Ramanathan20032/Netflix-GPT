import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, formatRuntime, formatDate, getRatingColor } from "../../utils/constants";
import StarRating from "../ui/StarRating";
import { Link } from "react-router-dom";

const MovieInfoBannerPage = ({ mediaType }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    if (!details) return null;

    // Helper functions to get the correct data based on media type
    const getTitle = () => {
        if (mediaType === "movie") {
            return details?.title || details?.original_title;
        } else {
            return details?.name || details?.original_name;
        }
    };

    const getReleaseDate = () => {
        if (mediaType === "movie") {
            return details?.release_date;
        } else {
            return details?.first_air_date;
        }
    };

    const getRuntime = () => {
        if (mediaType === "movie") {
            return details?.runtime;
        } else {
            // TV shows have episode_run_time array, check if it exists and has content
            const episodeRuntime = details?.episode_run_time;
            return episodeRuntime && episodeRuntime.length > 0 ? episodeRuntime[0] : null;
        }
    };

    const getAdultRating = () => {
        if (mediaType === "movie") {
            return details?.adult ? '18+' : '13+';
        } else {
            // For TV shows, check if it's adult content
            return details?.adult ? 'TV-MA' : 'TV-13';
        }
    };

    return (
        <>
            {/* Hero Section with Backdrop */}
            <div className="relative h-[70vh] sm:h-[80vh] lg:h-[100vh] overflow-hidden">
                <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: details?.backdrop_path
                            ? `url(${IMAGE_BASE_URL}original${details?.backdrop_path})`
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
                            {getTitle() && (
                                <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-2 sm:mb-4">
                                    {getTitle()}
                                </h1>
                            )}
                            {details?.tagline && (
                                <p className="text-lg sm:text-xl text-gray-300 sm:mb-5 mb-3 italic">
                                    "{details?.tagline}"
                                </p>
                            )}
                        </div>

                        {/* Movie Stats */}
                        <div className="flex flex-wrap items-center gap-4 mb-5 text-sm md:text-base">
                            {getReleaseDate() && (
                                <span className="text-gray-300">
                                    {`${formatDate(getReleaseDate())}` || 'TBA'}
                                </span>
                            )}
                            {/* [movieDetails?.runtime != null] --> check for [movieDetails?.runtime!== null && movieDetails?.runtime!== undefined] */}
                            {<span className="text-gray-300">
                                {getRuntime() ? formatRuntime(getRuntime()) : 'N/A'}
                            </span>}

                            {details?.adult !== undefined && (
                                <span className={`text-white px-2 py-1 rounded text-xs sm:text-sm font-medium ${details?.adult ? 'bg-red-600' : 'bg-blue-600'}`}>
                                    {getAdultRating()}
                                </span>
                            )}
                            {details?.status && (
                                <span className="bg-green-500 text-white px-2 py-1 rounded text-xs sm:text-sm font-medium">
                                    {details?.status}
                                </span>
                            )}
                        </div>

                        {/* Rating and Popularity */}
                        <div className="flex flex-wrap items-center gap-4 mb-6">
                            {details?.vote_average != null && (
                                <div className="flex items-center gap-3">
                                    <StarRating rating={details?.vote_average} />
                                    <div>
                                        <span className={`font-semibold ${getRatingColor(details?.vote_average)}`}>
                                            {details?.vote_average.toFixed(1)}
                                        </span>
                                        {details?.vote_count != null && (
                                            <span className="text-gray-400 text-sm ml-1">
                                                ({details?.vote_count.toLocaleString()} votes)
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {details?.popularity != null && (
                                <div className="flex items-center gap-1">
                                    <svg className="w-5 h-5 text-orange-500" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M12.395 2.553a1 1 0 00-1.45-.385c-.345.23-.614.558-.822.88-.214.33-.403.713-.57 1.116-.334.804-.614 1.768-.84 2.734a31.365 31.365 0 00-.613 3.58 2.64 2.64 0 01-.945-1.067c-.328-.68-.398-1.534-.398-2.654A1 1 0 005.05 6.05 6.981 6.981 0 003 11a7 7 0 1011.95-4.95c-.592-.591-.98-.985-1.348-1.467-.363-.476-.724-1.063-1.207-2.03zM12.12 15.12A3 3 0 017 13s.879.5 2.5.5c0-1 .5-4 1.25-4.5.5 1 .786 1.293 1.371 1.879A2.99 2.99 0 0113 13a2.99 2.99 0 01-.879 2.121z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-300 font-medium">
                                        {Math.round(details?.popularity)} Popularity
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* Genres */}
                        {details?.genres && details?.genres.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-5.5">
                                {details?.genres.map((genre, index) => (
                                    <Link
                                        key={genre.id || index}
                                        to = {`/${mediaType}/genere/${genre.id}`}
                                        className="bg-white/15 hover:bg-white/20 hover:bg-opacity-50 transition-all duration-300 cursor-pointer text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm"
                                    >
                                        {`${genre.name}`}
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Overview */}
                        {details?.overview && (
                            <p className="text-gray-300 sm:text-lg text-base max-w-3xl leading-relaxed line-clamp-3 sm:line-clamp-2">   
                                {details?.overview}
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfoBannerPage; 