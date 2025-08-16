import { useContext } from "react";
import MuteContext from "../context/MuteContext";

// Custom hook to use mute context
export const useMute = () => {
    const context = useContext(MuteContext);
    if (!context) {
        throw new Error('useMute must be used within a MuteProvider');
    }
    return context;
}; 