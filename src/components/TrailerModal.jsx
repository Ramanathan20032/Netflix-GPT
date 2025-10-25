import { useDispatch, useSelector } from "react-redux";
import { closeTrailer } from "../store/slices/movieTrailerSlice";
import { useEffect } from "react";

const TrailerModal = () => {

    const dispatch = useDispatch();
    const { trailer, isOpen } = useSelector((store) => store?.movieTrailer);

    // Filter for trailer type, fallback to first available video
    const trailerVideos = trailer?.filter((movie) => movie?.type === "Trailer");
    const selectedTrailer = trailerVideos?.length > 0 ? trailerVideos[0] : trailer?.[0];
    const trailerId = selectedTrailer?.key;

    // Adding History Entry
    useEffect(() => {
        if (isOpen) {
            // Push a state when modal opens
            window.history.pushState({ modalOpen: true }, '', window.location.href);
        }
    }, [isOpen]);

    useEffect(() => {
        const handlePopState = (event) => {
            if (isOpen) {
                dispatch(closeTrailer())
                // Push current state back to prevent navigation
                window.history.pushState(null, '', window.location.href);
            }
        }

        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('popstate', handlePopState);
        }
    }, [dispatch, isOpen])

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            dispatch(closeTrailer())
        }
    };

    return (
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/90 bg-opacity-80 z-[200] flex justify-center items-center p-4"
                    onClick={handleOverlayClick}
                >
                    {/* Close Button — positioned relative to the overlay */}
                    <button
                        className="absolute top-6 right-6 text-white hover:text-gray-300 transition z-[201]"
                        onClick={() => dispatch(closeTrailer())}
                        aria-label="Close Trailer"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="white"
                            className="w-8 h-8"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    </button>

                    {/* Trailer Container */}
                    {trailerId ? (
                        <div
                            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-xl"
                            onClick={(e) => e.stopPropagation()} // prevent closing when clicking video
                        >
                            <iframe
                                src={`https://www.youtube.com/embed/${trailerId}?autoplay=1`}
                                title="Movie Trailer"
                                className="w-full h-full rounded-lg"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                            />
                        </div>
                    ) : (
                        <div
                            className="relative w-full max-w-4xl aspect-video rounded-xl overflow-hidden shadow-xl bg-gray-800 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="text-center text-white">
                                <svg
                                    className="w-14 h-14 mx-auto mb-2.5 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                                    />
                                </svg>
                                <p className="text-lg font-medium">No Trailer Available</p>
                                <p className="text-sm text-gray-400 mt-2">Trailer Not Found For This Movie</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

        </>
    )
}

export default TrailerModal;