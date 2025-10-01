import { useSelector } from "react-redux";

const MovieInfoLanguage = ({ title, mediaType }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    if (!details) return null;

    return (
        <>
            {details?.spoken_languages && details?.spoken_languages?.length > 0 && (
                <div className="mb-11">
                    <h2 className="text-lg sm:text-2xl font-bold text-white mb-4">{title}</h2>
                    <div className="flex flex-wrap gap-2">
                        {details?.spoken_languages?.map((language, index) => (
                            <span
                                key={index}
                                className="bg-white/15 text-white px-3 py-1.5 rounded-full text-sm font-medium backdrop-blur-sm"
                            >
                                {language.english_name}
                            </span>
                        ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieInfoLanguage;