import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../utils/constants";
import noImage from "../../assets/images/no-image.png";

const MovieInfoSeasonsAndEpisodes = ({ title, mediaType }) => {
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const [activeSeason, setActiveSeason] = useState(0); // Start with first season (index 0)

    if (!tvDetails) return null;

    const seasons = tvDetails?.seasons || [];

    // Set first season as active on component mount
    useEffect(() => {
        if (seasons.length > 0) {
            setActiveSeason(0);
        }
    }, [seasons]);

    const handleSeasonClick = (seasonIndex) => {
        setActiveSeason(seasonIndex);
    };

    return (
        <>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>

            {/* Seasons Navigation */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-0 mb-6">
                {seasons.length > 0 && seasons.map((season, index) => (
                    <button
                        key={season?.id}
                        onClick={() => handleSeasonClick(index)}
                        className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors duration-200 ${activeSeason === index
                            ? 'text-white border-red-500 bg-gray-800/50'
                            : 'text-gray-400 border-transparent hover:text-white hover:border-gray-600'
                            }`}
                    >
                        {season?.name}
                    </button>
                ))}
            </div>

            {/* Header of Active Season and Episodes Count Display */}
            <div className="mb-4">
                <div className="flex items-center gap-2">
                    <span className="text-white font-semibold">
                        {seasons[activeSeason]?.name}
                    </span>
                    <span className="text-gray-400">
                        {seasons[activeSeason]?.episode_count} episodes
                    </span>
                </div>
            </div>

            {/* Episodes List - Only show episodes for active season */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-0 mb-11">
                {seasons[activeSeason] && (
                    <div className="text-center p-4 bg-gray-800 rounded-lg w-64 h-20">
                        <p className="text-white font-medium">
                            {seasons[activeSeason]?.episode_count} Episodes
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                            {seasons[activeSeason]?.name}
                        </p>
                    </div>
                )}
            </div>
        </>
    )
}

export default MovieInfoSeasonsAndEpisodes;