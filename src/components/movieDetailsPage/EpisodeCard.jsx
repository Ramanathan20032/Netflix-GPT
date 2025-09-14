import { IMAGE_BASE_URL } from "../../utils/constants";
import noImage from "../../assets/images/no-image.png";

const EpisodeCard = ({ episode, seasonNumber, isSpecial }) => {
    return (
        <div key={episode?.id || index} className="w-64 min-h-20 flex-shrink-0 group cursor-pointer">
            <div className="relative w-full h-34 overflow-hidden rounded-md mb-2">
                {/* Image */}
                <img
                    src={episode?.still_path ? IMAGE_BASE_URL + "w500/" + episode?.still_path : noImage}
                    alt={episode?.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-103"
                />
                {/* Bottom Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {/* Episode Number - Hidden by default, shown on hover */}
                <div className="absolute bottom-2 left-2 text-white font-bold text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {isSpecial ? 'Special' : `Episode ${episode?.episode_number}`}
                </div>
            </div>

            {/* Episode */}
            <p className="text-gray-300 text-sm line-clamp-2 group-hover:text-white transition-colors duration-300">
                {episode?.name}
            </p>
            {/* Runtime */}
            <p className="text-gray-400 text-xs mt-1">
                {episode?.runtime && `${episode?.runtime} min`}
            </p>
        </div>
    )
}

export default EpisodeCard;