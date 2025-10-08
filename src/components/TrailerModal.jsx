import { useDispatch, useSelector } from "react-redux";
import { closeTrailer } from "../store/slices/movieTrailerSlice";

const TrailerModal = () => {

    const dispatch = useDispatch();
    const { trailer, isOpen } = useSelector((store) => store.movieTrailer);

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-80 z-[200] flex justify-center items-center">
                    <div className="relative w-[90%] max-w-3xl aspect-video">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1`}
                            title="Movie Trailer"
                            className="w-full h-full rounded-lg shadow-lg"
                            allow="autoplay; encrypted-media"
                            allowFullScreen
                        />
                    </div>
                </div>
            )
            }
        </>
    )
}

export default TrailerModal;