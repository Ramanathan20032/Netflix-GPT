import { useDispatch, useSelector } from "react-redux";
import { MovieTrailerThunk } from "../../store/thunks/movieTrailerThunk";
import { addFavoriteItem } from "../../store/slices/favoriteSlice";

const MovieInfoCtaButtons = ({ mediaType }) => {
    const dispatch = useDispatch()
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === 'movie' ? movieDetails : tvDetails;

    const playTrailer = () => {
        if (!details?.id) return null;
        dispatch(MovieTrailerThunk({ mediaType, movieId: details?.id }));
    }

    const addToFavorite = () => {
        if (!details) return null;
        dispatch(addFavoriteItem(details))
    }

    return (
        <>
            <div className="flex flex-wrap gap-4 mb-11">
                {/* Play Trailer Button */}
                <button className="bg-red-600 hover:bg-red-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors cursor-pointer transition-all duration-200 flex items-center gap-1.5 group"
                    onClick={playTrailer}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    <span>Play Trailer</span>
                </button>
                {/* Add to List Button */}
                <button className="bg-gray-800 bg-opacity-70 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors cursor-pointer transition-all duration-200 flex items-center gap-1.5 group"
                    onClick={addToFavorite}>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M6 2a2 2 0 00-2 2v18l8-4 8 4V4a2 2 0 00-2-2H6zm6 8V7a1 1 0 10-2 0v3H7a1 1 0 100 2h3v3a1 1 0 102 0v-3h3a1 1 0 100-2h-3z" />
                    </svg>
                    <span>Add to List</span>
                </button>
                {/* Rate Movie Button */}
                <button className="bg-gray-800 bg-opacity-70 hover:bg-gray-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg font-semibold transition-colors cursor-pointer transition-all duration-200 flex items-center gap-1.5 group">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.966a1 1 0 00.95.69h4.173c.969 0 1.371 1.24.588 1.81l-3.38 2.455a1 1 0 00-.364 1.118l1.287 3.966c.3.921-.755 1.688-1.54 1.118l-3.381-2.455a1 1 0 00-1.176 0l-3.38 2.455c-.785.57-1.84-.197-1.54-1.118l1.287-3.966a1 1 0 00-.364-1.118L2.049 9.393c-.783-.57-.38-1.81.588-1.81h4.173a1 1 0 00.95-.69l1.286-3.966z" />
                    </svg>
                    <span>Rate Movie</span>
                </button>
            </div>
        </>
    )
}

export default MovieInfoCtaButtons;