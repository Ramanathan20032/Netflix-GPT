import { useSelector } from "react-redux";

const MovieInfoOverView = ({ title }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    if (!movieDetails) return null;

    return (
        <>
            {movieDetails?.overview && (
                <div className="mb-11">
                    <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
                    <p className="text-gray-300 text-lg font-medium leading-relaxed max-w-8xl">
                        {movieDetails?.overview}
                    </p>
                </div>
            )}
        </>
    )
}

export default MovieInfoOverView;