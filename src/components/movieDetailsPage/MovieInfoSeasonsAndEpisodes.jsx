import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../utils/constants";
import noImage from "../../assets/images/no-image.png";
import { tvSeriesSeasonThunk } from "../../store/thunks/tvSeriesSeasonThunk";
import ShimmerEpisodeCard from "../ui/ShimmerEpisodeCard";
import EpisodeCard from "./EpisodeCard";

const MovieInfoSeasonsAndEpisodes = ({ title, mediaType }) => {
    const dispatch = useDispatch();
    const { tvSeriesSeason, tvSeriesSeasonLoading, tvSeriesSeasonError } = useSelector((store) => store?.tvSeriesSeason);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const [activeSeason, setActiveSeason] = useState(0); // Will be updated by useEffect

    if (!tvDetails) return null;
    if (!tvSeriesSeason) return null;

    const seasons = tvDetails?.seasons || [];
    const tvId = tvDetails?.id;

    // Set first regular season as active on component mount (skip Specials)
    useEffect(() => {
        if (seasons?.length > 0) {
            // Find first regular season (not Specials)
            const firstRegularSeasonIndex = seasons?.findIndex(season => season?.season_number > 0);
            if (firstRegularSeasonIndex !== -1) {
                setActiveSeason(firstRegularSeasonIndex);
                // Also dispatch API call for the selected season
                const selectedSeason = seasons[firstRegularSeasonIndex];
                if (dispatch && tvId && mediaType && selectedSeason?.season_number) {
                    dispatch(tvSeriesSeasonThunk({ mediaType, tvId, seasonNumber: selectedSeason.season_number }));
                }
            }
        }
    }, [seasons, dispatch, tvId, mediaType]);

    const handleSeasonClick = (seasonIndex) => {
        setActiveSeason(seasonIndex);
        // ! For Specials (season_number = 0), try API call with season 0
        // ! For regular seasons, use the season_number from the season object
        const selectedSeason = seasons[seasonIndex];
        if (selectedSeason?.season_number === 0) {
            // Specials - try API call with season 0
            if (dispatch && tvId && mediaType) {
                dispatch(tvSeriesSeasonThunk({ mediaType, tvId, seasonNumber: 0 }));
            }
        } else {
            // Dispatch API call for regular seasons
            if (dispatch && tvId && mediaType && selectedSeason?.season_number) {
                dispatch(tvSeriesSeasonThunk({ mediaType, tvId, seasonNumber: selectedSeason.season_number }));
            }
        }
    };

    return (
        <>
            <h2 className="text-xl sm:text-2xl font-bold mb-4">{title}</h2>

            {/* Seasons Navigation */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-0 mb-6">
                {seasons?.length > 0 && seasons?.map((season, index) => (
                    <button
                        key={season?.id}
                        onClick={() => handleSeasonClick(index)}
                        className={`px-3.5 py-2.5 text-md font-medium whitespace-nowrap border-b-1 sm:border-b-2 transition-colors duration-200 rounded-t-md cursor-pointer ${activeSeason === index
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
                <div className="flex items-center gap-3">
                    <span className="text-md sm:text-lg text-white font-semibold">
                        {seasons[activeSeason]?.name}
                    </span>
                    <span className="text-sm text-red-500 mt-0.5">
                        {seasons[activeSeason]?.episode_count} episodes
                    </span>
                </div>
            </div>

            {/* Episodes List - Show episodes for active season */}
            <div className="flex overflow-x-scroll scrollbar-hide gap-4 mb-11">
                {tvSeriesSeasonLoading ? (
                    // Loading state                
                    Array.from({ length: 8 }).map((_, index) => (
                        <ShimmerEpisodeCard key={index} />
                    ))
                ) : tvSeriesSeasonError ? (
                    // Error state - check if it's Specials with 404 error
                    seasons[activeSeason]?.season_number === 0 ? (
                        <div className="text-center p-4 bg-gray-800 rounded-lg w-64 min-h-20 flex items-center justify-center">
                            <p className="text-gray-400">Specials episodes - detailed info not available</p>
                        </div>
                    ) : (
                        <div className="text-center p-4 bg-gray-800 rounded-lg w-64 min-h-20 flex items-center justify-center">
                            <p className="text-red-400">Error loading episodes: {tvSeriesSeasonError}</p>
                        </div>
                    )
                ) : tvSeriesSeason?.episodes && tvSeriesSeason.episodes.length > 0 ? (
                    // Show episodes for any season (including Specials)
                    tvSeriesSeason?.episodes?.map((episode, index) => (
                        <EpisodeCard
                            key={episode?.id || index}
                            episode={episode}
                            seasonNumber={seasons[activeSeason]?.season_number}
                            isSpecial={seasons[activeSeason]?.season_number === 0} />
                    ))
                ) : (
                    // No episodes available
                    <div className="text-center p-4 bg-gray-800 rounded-lg w-64 min-h-20 flex items-center justify-center">
                        <p className="text-gray-400">No episodes available</p>
                    </div>
                )}
            </div>
        </>
    )
}

export default MovieInfoSeasonsAndEpisodes;