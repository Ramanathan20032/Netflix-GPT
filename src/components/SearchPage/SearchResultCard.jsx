import { IMAGE_BASE_URL } from '../../utils/constants';
import { useNavigate } from "react-router-dom";
import noImage from '../../assets/images/no-series.jpeg';

const SearchResultCard = ({ result, setIsSearchOpen }) => {
    const navigate = useNavigate();

    // ! Utility function to get gradient class based on type
    const getGradientClass = (type) => {
        switch (type) {
            case 'movie':
                return 'from-purple-500 to-pink-500';
            case 'tv':
                return 'from-blue-500 to-cyan-500';
            case 'person':
                return 'from-green-500 to-emerald-500';
            default:
                return 'from-gray-500 to-gray-600';
        }
    };

    // ! Utility function to get image source
    const getImageSrc = (result) => {
        if (result.backdrop_path) return `${IMAGE_BASE_URL}w500${result.backdrop_path}`;
        else if (result.poster_path) return `${IMAGE_BASE_URL}w500${result.poster_path}`;
        else if (result.profile_path) return `${IMAGE_BASE_URL}w500${result.profile_path}`;
        else return noImage;
    };

    const handleNavigateDetail = (result) => {
        if (!result?.id) return;
        setIsSearchOpen(false)

        const type = result.media_type || result.type
        if (type === 'person') navigate(`/people/${result.id}`)
        else if (type === 'tv' || type === 'movie') navigate(`/${type}/${result.id}`)
        else {
            console.warn('Unknown media type:', type, result);
            navigate(`*`)
        }
    }

    const type = result.media_type || result.type || 'unknown';
    const gradientClass = getGradientClass(type);

    return (
        <>
            <div className='cursor-pointer group'
                onClick={() => handleNavigateDetail(result)}>
                <div className='relative overflow-hidden rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-101 group-hover:shadow-sm'>
                    <img
                        src={getImageSrc(result)}
                        alt={result.title || result.name}
                        className='w-full h-34 sm:h-36 object-cover'
                        onError={(e) => {
                            e.target.src = noImage;
                        }}
                    />

                    {/* Media Type Badge */}
                    <div
                        className={`absolute top-1 right-1 bg-gradient-to-r ${gradientClass} text-white text-[10px] sm:text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded-md shadow-md`}
                    >
                        {type}
                    </div>

                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-10 group-hover:opacity-100 transition-all duration-300'></div>
                </div>
                <h3 className='text-white text-xs sm:text-sm font-semibold truncate'>
                    {result.title || result.name}
                </h3>
            </div>
        </>
    )
}

export default SearchResultCard;