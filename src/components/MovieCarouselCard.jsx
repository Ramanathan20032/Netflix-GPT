import { Link } from "react-router-dom";
import { IMAGE_BASE_URL } from "../utils/constants";

const MovieCarouselCard = ({ movie }) => {
    const imageUrl = movie?.poster_path ? IMAGE_BASE_URL + "w185/" + movie.poster_path : null;
    const movieTitle = movie?.title || movie?.name || "Unknown";

    return (
        <Link to={`/movie/${movie?.id}`} className="relative rounded-md overflow-hidden transition-all duration-300 hover:scale-105 hover:z-10 cursor-pointer group bg-gray-800">
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt={movieTitle}
                    className="w-[100%] h-[100%] object-cover rounded-lg"
                />
            ) : null}

            {/* Hover overlay with title - no white border interfering */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-3">
                    <h3 className="text-white text-md font-medium truncate">
                        {movieTitle}
                    </h3>
                </div>
            </div>
        </Link>
    )
}

export default MovieCarouselCard;
