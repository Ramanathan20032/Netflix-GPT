import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

// Context
import { MuteProvider } from "../context/MuteContext";

// Components
import VideoTitle from "./videoTitle";
import VideoPlayer from "./videoPlayer";

// Thunks
import { movieTeaserThunk } from "../store/thunks/moviesTeaserThunk";


const MainContainer = () => {
    const dispatch = useDispatch();
    const { popularMovies } = useSelector((store) => store?.movies);
    const spotLightMovie = popularMovies?.[0];

    useEffect(() => {
        dispatch(movieTeaserThunk(spotLightMovie?.id));
    }, [dispatch, spotLightMovie?.id]);


    return (
        <MuteProvider>
            <div className="w-full h-full relative">
                {/* Video Player - Bottom Layer */}
                {/* <VideoPlayer /> */}

                {/* Enhanced Black Overlay with stronger left gradient - Middle Layer */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/90 via-black/70 via-black/50 to-transparent z-10 pointer-events-none"></div>

                {/* Video Title - Top Layer with pointer events */}
                <VideoTitle spotLightMovie={spotLightMovie}/>
            </div>
        </MuteProvider>
    );
}

export default MainContainer;