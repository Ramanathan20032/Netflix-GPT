import { useSelector } from "react-redux";

const MovieInfoOverView = ({ title, mediaType }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    if (!details) return null;

    return (
        <>
            {details?.overview && (
                <div className="mb-11">
                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-gray-300 text-md md:text-lg font-medium leading-relaxed max-w-8xl">
                        {details?.overview}
                    </p>
                </div>
            )}
        </>
    )
}

export default MovieInfoOverView;