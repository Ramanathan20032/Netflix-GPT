import { useSelector } from "react-redux";
import { IMAGE_BASE_URL, formatDate } from "../../utils/constants"
import SocialButton from "./SocialButton";

const ProfileBanner = () => {
    const {peopleData} = useSelector((store) => store?.PeopleDetail);
    const {details, externalIds} = peopleData;

    return (
        <div className="relative">
            {/* Background Image */}
            {details?.profile_path && (
                <div className="absolute inset-0 h-96 md:h-[450px] overflow-hidden">
                    <img
                        src={IMAGE_BASE_URL + "w1280/" + details?.profile_path}
                        alt={details.name}
                        className="w-full h-full object-cover opacity-20"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
                </div>
            )}

            {/* Content */}
            <div className="relative z-10 px-7 sm:px-8 md:px-12 py-8 pt-30 md:pt-40">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                        {/* Profile Image */}
                        <div className="flex-shrink-0 mx-auto lg:mx-0">
                            <div className="w-48 h-72 sm:w-56 sm:h-84 lg:w-64 lg:h-96 rounded-lg overflow-hidden shadow-2xl">
                                <img
                                    src={IMAGE_BASE_URL + "w500/" + details?.profile_path}
                                    alt={details?.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Person Details */}
                        <div className="flex-1 space-y-6">
                            <div>
                                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-4xl font-bold mb-2">
                                    {details?.name}
                                </h1>
                                {details?.also_known_as && details?.also_known_as.length > 0 && (
                                    <p className="text-gray-300 text-md sm:text-lg">    
                                        Also known as: {details?.also_known_as?.join(", ")}
                                    </p>
                                )}
                            </div>

                            {/* Basic Info */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                {details?.birthday && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Born</h3>
                                        <p className="text-lg">{formatDate(details?.birthday)}</p>
                                        {details?.place_of_birth && (
                                            <p className="text-sm text-gray-400">{details?.place_of_birth}</p>
                                        )}
                                    </div>
                                )}

                                {details?.deathday && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Died</h3>
                                        <p className="text-lg">{formatDate(details?.deathday)}</p>
                                    </div>
                                )}

                                {details?.known_for_department && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Known For</h3>
                                        <p className="text-lg">{details?.known_for_department}</p>
                                    </div>
                                )}

                                {details?.popularity && (
                                    <div>
                                        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Popularity</h3>
                                        <p className="text-lg">{Math.round(details?.popularity)}</p>
                                    </div>
                                )}
                            </div>

                            {/* External Links */}
                            <div>
                                <h2 className="text-2xl font-bold mb-4">External Links</h2>
                                <div className="flex flex-wrap gap-4">
                                    <SocialButton platform="imdb" id={externalIds?.imdb_id} />
                                    <SocialButton platform="facebook" id={externalIds?.facebook_id} />
                                    <SocialButton platform="instagram" id={externalIds?.instagram_id} />
                                    <SocialButton platform="twitter" id={externalIds?.twitter_id} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileBanner;