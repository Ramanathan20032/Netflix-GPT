import { IMAGE_BASE_URL, formatRuntime, formatDate, getRatingColor } from "../utils/constants";

const MovieInfoDetail = ({ movieDetails, title }) => {
    if (!movieDetails) return null;

    return (
        <>
            {/* Poster and Additional Details */}
            <div className="flex flex-col sm:flex-row gap-8 mb-11">
                {/* Poster */}
                {movieDetails?.poster_path && (
                    <div className="flex-shrink-0">
                        <img
                            src={`${IMAGE_BASE_URL}w500${movieDetails?.poster_path}`}
                            alt={movieDetails?.title}
                            className="w-64 h-96 object-cover rounded-2xl shadow-xl"
                        />
                    </div>
                )}

                {/* Movie Details */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>

                    <div className="space-y-4">
                        {(movieDetails?.original_title || movieDetails?.title) && (
                            <div>
                                <span className="text-gray-400 font-medium">Original Title:</span>
                                <span className="text-white ml-2">{movieDetails?.original_title || movieDetails?.title}</span>
                            </div>
                        )}

                        {movieDetails?.release_date && (
                            <div>
                                <span className="text-gray-400 font-medium">Release Date:</span>
                                <span className="text-white ml-2">{formatDate(movieDetails?.release_date)}</span>
                            </div>
                        )}

                        {movieDetails?.runtime != null && (
                            <div>
                                <span className="text-gray-400 font-medium">Runtime:</span>
                                <span className="text-white ml-2">{formatRuntime(movieDetails?.runtime) || 'TBA'}</span>
                            </div>
                        )}

                        {movieDetails?.status && (
                            <div>
                                <span className="text-gray-400 font-medium">Status:</span>
                                <span className="text-white ml-2">{movieDetails?.status}</span>
                            </div>
                        )}

                        {movieDetails?.vote_average != null && (
                            <div>
                                <span className="text-gray-400 font-medium">Rating:</span>
                                <span className={`ml-2 font-semibold ${getRatingColor(movieDetails?.vote_average)}`}>
                                    {movieDetails?.vote_average.toFixed(1)}/10
                                </span>
                            </div>
                        )}

                        {movieDetails?.vote_count != null && (
                            <div>
                                <span className="text-gray-400 font-medium">Total Votes:</span>
                                <span className="text-white ml-2">{movieDetails?.vote_count.toLocaleString()}</span>
                            </div>
                        )}

                        {movieDetails?.popularity && (
                            <div>
                                <span className="text-gray-400 font-medium">Popularity Score:</span>
                                <span className="text-white ml-2">{Math.round(movieDetails?.popularity)}</span>
                            </div>
                        )}

                        {movieDetails?.genres && movieDetails?.genres.length > 0 && (
                            <div>
                                <span className="text-gray-400 font-medium">Genres:</span>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {movieDetails?.genres.map((genre, index) => (
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