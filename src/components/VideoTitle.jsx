import MuteToggle from "./MuteToggle";
import { IMAGE_BASE_URL  } from "../utils/constants";

// Updated VideoTitle Component with Mute Toggle at bottom left
const VideoTitle = ({ spotLightMovie }) => {

    return (
        // <div className="absolute bottom-60 left-14 z-20 max-w-md text-white">
        <div className="absolute bottom-1/3 left-14 z-20 max-w-md text-white">

            {/* Movie Title */}
            <h1 className="text-5xl font-bold mb-4 drop-shadow-2xl">
                {spotLightMovie?.title}
            </h1>

            {/* Movie Overview */}
            <p className="text-lg mb-6 text-gray-200 drop-shadow-lg line-clamp-3">
                {spotLightMovie?.overview}
            </p>

            <div className="flex gap-4 mb-4">
                <button className="bg-white hover:bg-gray-300 text-black px-5 py-2.5 rounded font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                    Play
                </button>

                    <button className="bg-gray-800 bg-opacity-70 hover:bg-gray-700 text-white px-5 py-2.5 rounded font-semibold transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    More Info
                </button>
            </div>

            {/* Mute Toggle Button at bottom left of VideoTitle */}
            <div className="flex justify-start">
                <MuteToggle />
            </div>
        </div>
    );
};

export default VideoTitle;