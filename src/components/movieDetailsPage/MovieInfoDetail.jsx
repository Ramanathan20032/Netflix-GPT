import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, formatRuntime, formatDate, getRatingColor } from "../../utils/constants";
import noImage from "../../assets/images/no-image.png";

const MovieInfoDetail = ({ title, mediaType }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    if (!details) return null;

    // Helper functions to get the correct data based on media type
    const getTitle = () => {
        if (mediaType === "movie") {
            return details?.original_title || details?.title;
        } else {
            return details?.original_name || details?.name;
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

    return (
        <>
            {/* Poster and Additional Details */}
            <div className="flex flex-col sm:flex-row gap-8 mb-11">
                {/* Poster */}
                {details?.poster_path ? (
                    <div className="flex-shrink-0">
                        <img
                            src={`${IMAGE_BASE_URL}w500${details?.poster_path}`}
                            alt={getTitle()}
                            className="w-64 h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </div>
                ) : details?.backdrop_path ? (
                    <div className="flex-shrink-0">
                        <img
                            src={`${IMAGE_BASE_URL}w500${details?.backdrop_path}`}
                            alt={getTitle()}
                            className="w-64 h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </div>
                ) : (
                    <div className="flex-shrink-0">
                        <img src={noImage} alt="No Image" className="w-64 h-96 object-cover rounded-2xl shadow-xl" />
                    </div>
                )}

                {/* Movie Details */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

                    <div className="space-y-4">
                        {getTitle() && (
                            <div>
                                <span className="text-gray-400 font-medium">Original Title:</span>
                                <span className="text-white ml-2">{getTitle()}</span>
                            </div>
                        )}

                        {getReleaseDate() && (
                            <div>
                                <span className="text-gray-400 font-medium">Release Date:</span>
                                <span className="text-white ml-2">{formatDate(getReleaseDate())}</span>
                            </div>
                        )}

                        {
                            <div>
                                <span className="text-gray-400 font-medium">Runtime:</span>
                                <span className="text-white ml-2">{formatRuntime(getRuntime()) || 'N/A'}</span>
                            </div>
                        }

                        {details?.status && (
                            <div>
                                <span className="text-gray-400 font-medium">Status:</span>
                                <span className="text-white ml-2">{details?.status}</span>
                            </div>
                        )}

                        {details?.vote_average != null && (
                            <div>
                                <span className="text-gray-400 font-medium">Rating:</span>
                                <span className={`ml-2 font-semibold ${getRatingColor(details?.vote_average)}`}>
                                    {details?.vote_average.toFixed(1)}/10
                                </span>
                            </div>
                        )}

                        {details?.vote_count != null && (
                            <div>
                                <span className="text-gray-400 font-medium">Total Votes:</span>
                                <span className="text-white ml-2">{details?.vote_count.toLocaleString()}</span>
                            </div>
                        )}

                        {details?.popularity && (
                            <div>
                                <span className="text-gray-400 font-medium">Popularity Score:</span>
                                <span className="text-white ml-2">{Math.round(details?.popularity)}</span>
                            </div>
                        )}

                        {details?.genres && details?.genres.length > 0 && (
                            <div>
                                <span className="text-gray-400 font-medium">Genres:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {details?.genres.map((genre, index) => (
                                        <span
                                            key={genre.id || index}
                                            className="bg-white/15 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default MovieInfoDetail;