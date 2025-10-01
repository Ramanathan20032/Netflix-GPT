import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Context
import { MuteProvider } from "../context/MuteContext";

// Components
import VideoTitle from "./VideoTitle";
import VideoPlayer from "./VideoPlayer";

// Thunks
import { movieTeaserThunk } from "../store/thunks/moviesTeaserThunk";


const MainContainer = () => {
    const dispatch = useDispatch();
    const { popularMovies } = useSelector((store) => store?.movies);
    const spotLightMovie = popularMovies?.[0];

    useEffect(() => {
        if (!spotLightMovie?.id) return;
        dispatch(movieTeaserThunk(spotLightMovie.id));
        // dispatch(movieTeaserThunk("634649"));
    }, [dispatch, spotLightMovie?.id]);


    return (
        <MuteProvider>
            <div className="relative w-full min-h-[60vh] sm:min-h-[70vh] md:min-h-[75vh] lg:min-h-screen">
                {/* Video Player - Bottom Layer */}
                <VideoPlayer />

                {/* Enhanced Black Overlay with stronger left gradient - Middle Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 sm:from-black via-black/70 md:via-black/60 to-transparent z-10 pointer-events-none"></div>

                {/* Video Title - Top Layer with pointer events */}
                <VideoTitle spotLightMovie={spotLightMovie} />
            </div>
        </MuteProvider>
    );
}

export default MainContainer;