import { useSelector } from "react-redux";
import { IMAGE_BASE_URL } from "../../utils/constants";

const MovieProductionInfo = ({ title, mediaType }) => {
    const { movieDetails } = useSelector((store) => store?.details);
    const { tvDetails } = useSelector((store) => store?.tvDetail);
    const details = mediaType === "movie" ? movieDetails : tvDetails;
    if (!details) return null;

    return (
        <>
            {details?.production_companies && details?.production_companies?.filter((company) => company?.logo_path)?.length > 0 && (
                <div className="mb-11">
                    <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-4 p-4 py-6 rounded-lg bg-gray-800 bg-opacity-70 text-white">
                        {details?.production_companies
                            ?.filter((company) => company?.logo_path)
                            ?.map((company) => (
                                <div key={company?.id} className="text-center flex flex-col items-center justify-center border-1 border-gray-700 rounded-lg p-4">
                                    {company?.logo_path && (
                                        <img
                                            src={`${IMAGE_BASE_URL}w200${company?.logo_path}`}
                                            alt={company?.name}
                                            className="w-20 h-20 object-contain mx-auto mb-3"
                                        />
                                    )}
                                    <p className="text-white text-sm font-semibold">{company?.name}</p>
                                    {/* <p className="text-white text-sm line-clamp-1 sm:line-clamp-none">{company?.name}</p> */}
                                </div>
                            ))}
                    </div>
                </div>
            )}
        </>
    )
}

export default MovieProductionInfo;
