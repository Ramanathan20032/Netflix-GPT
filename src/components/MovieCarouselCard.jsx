import { Link, useNavigate, useParams } from "react-router-dom";
import { IMAGE_BASE_URL } from "../utils/constants";
import noImage from "../assets/images/no-image.png";

const MovieCarouselCard = ({ movie, mediaType }) => {
    const navigate = useNavigate();

    const imagePath = movie?.poster_path || movie?.profile_path;
    const imageUrl = imagePath ? IMAGE_BASE_URL + "w185/" + imagePath : null;
    const movieTitle = movie?.title || movie?.original_title || movie?.name || movie?.original_name || "Unknown";

    // Use the passed mediaType prop, fallback to "movie" if not provided
    const routeMediaType = mediaType || "movie";

    // Check if this is a person (cast/crew) based on the presence of person-specific properties
    const isPerson = movie?.known_for_department || movie?.credit_id || movie?.character || movie?.job;

    const handleNavigate = () => {
        if (isPerson) {
            // Navigate to people page
            navigate(`/people/${movie?.id}`);
        } else {
            // Navigate to movie/TV page
            navigate(`/${routeMediaType}/${movie?.id}`);
        }
    }

    return (
        <Link to={isPerson ? `/people/${movie?.id}` : `/${routeMediaType}/${movie?.id}`}
            className="relative rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer group bg-gray-800 w-full h-full block"
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={movieTitle}
                    className="w-full h-full object-cover rounded-lg"
                />
            ) : (
                <img
                    src={noImage}
                    alt="No Image"
                    className="w-full h-full object-cover rounded-lg"
                />
            )}

            {/* Hover overlay with title - no white border interfering */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-sm sm:text-md font-medium truncate">
                        {movieTitle}
                        {(movie?.known_for_department || movie?.credit_id) && (
                            <p className="text-gray-400 text-sm">
                                {/* For cast → show Character/Department, for crew → show Department/Job */}
                                {movie?.character
                                    // Cast
                                    ? `${movie?.character} | ${movie?.known_for_department}`
                                    // Crew
                                    : `${movie?.department || movie?.known_for_department} | ${movie?.job}`
                                }
                            </p>
                        )}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default MovieCarouselCard;
