import { useMute } from "../hooks/useMute";

// Mute Toggle Button Component
const MuteToggle = () => {
    const { isMuted, setIsMuted } = useMute();

    const toggleMute = () => {
        setIsMuted(!isMuted);
    };

    return (
        <button
            onClick={toggleMute}
            className="bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-2.5 rounded-full border border-white border-opacity-40 hover:border-opacity-60 transition-all duration-300 group flex items-center justify-center cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
        >
            {isMuted ? (
                // Muted Icon (Volume Off)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>
            ) : (
                // Unmuted Icon (Volume On)
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                </svg>
            )}
        </button>
    );
};

export default MuteToggle; 