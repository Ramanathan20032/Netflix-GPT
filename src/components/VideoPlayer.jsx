import { useSelector } from "react-redux";
import { useMute } from "../hooks/useMute";

// VideoPlayer Component that reacts to mute state
const VideoPlayer = () => {
    const { isMuted } = useMute();

    // Get movie trailer data from Redux store
    const { movieTeaser } = useSelector((store) => store?.movies);

    // Filter for trailer type, fallback to first available video
    const trailerVideos = movieTeaser?.filter((movie) => movie?.type === "Trailer");
    const selectedTrailer = trailerVideos?.length > 0 ? trailerVideos[0] : movieTeaser?.[0];
    const trailerID = selectedTrailer?.key;

    return (
        <>
            <iframe
                key={isMuted ? 'muted' : 'unmuted'} // Force re-render when mute state changes
                className="absolute inset-0 w-full h-full pointer-events-none"
                src={`https://www.youtube.com/embed/${trailerID}?autoplay=1&mute=${isMuted ? 1 : 0}&loop=1&playlist=${trailerID}&controls=0&rel=0&modestbranding=1&showinfo=0&disablekb=1&fs=0&iv_load_policy=3&cc_load_policy=0&enablejsapi=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                frameBorder="0"
                muted={isMuted}
            />
        </>
    );
};

export default VideoPlayer;