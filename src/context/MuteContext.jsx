import { createContext, useState } from "react";

// Create a context for mute state management
const MuteContext = createContext();

// Provider component to wrap your main container
export const MuteProvider = ({ children }) => {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <MuteContext.Provider value={{ isMuted, setIsMuted }}>
            {children}
        </MuteContext.Provider>
    );
};

export default MuteContext; 