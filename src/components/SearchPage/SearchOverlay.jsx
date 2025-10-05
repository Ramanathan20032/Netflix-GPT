import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IMAGE_BASE_URL } from '../../utils/constants'
import { multiSearchThunk } from '../../store/thunks/multiSearchThunk'
import { clearResultsOnNewQuery, clearSearch } from '../../store/slices/multiSearchSlice';
import { useNavigate } from "react-router-dom";


const SearchOverlay = ({ setIsSearchOpen }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { searchLoading, searchError, searchResults, totalResults } = useSelector((store) => store.multiSearch)
    const [searchQuery, setSearchQuery] = useState('');
    const debounceTimer = useRef(null);

    // ! handleSearch
    const handleSearch = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Clear previous timer
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }

        // Only search if query is not empty and has at least 2 characters
        if (query.trim().length >= 2) {
            dispatch(clearResultsOnNewQuery());
            // Debounce API call - wait 500ms after user stops typing
            debounceTimer.current = setTimeout(() => {
                // ! search api call
                dispatch(multiSearchThunk({ query: query.trim() }));
            }, 500);
        } else {
            // If the query is invalid (e.g., deleted down to 0 or 1 char), clear everything
            dispatch(clearSearch());
        }
    };

    // ! Cleanup debounce timer on unmount
    useEffect(() => {
        return () => {
            if (debounceTimer.current) {
                clearTimeout(debounceTimer.current);
            }
        };
    }, []);

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
        if (result.backdrop_path) {
            return `${IMAGE_BASE_URL}w500${result.backdrop_path}`;
        } else if (result.poster_path) {
            return `${IMAGE_BASE_URL}w500${result.poster_path}`;
        } else if (result.profile_path) {
            return `${IMAGE_BASE_URL}w500${result.profile_path}`;
        } else {
            return 'https://via.placeholder.com/500x281?text=No+Image';
        }
    };

    const handleNavigateDetail = (result) => {
        if (!result?.id) return;
        setIsSearchOpen(false)
        const type = result.media_type || result.type
        if (type === 'person') {
            navigate(`/people/${result.id}`)
        }
        else if (type === 'tv' || type === 'movie') {
            navigate(`/${type}/${result.id}`)
        }
        else {
            console.warn('Unknown media type:', type, result);
            navigate(`*`)
        }
    }


    return (
        <>
            {/* <div className='fixed inset-0 bg-gray-900 z-[100] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'> */}
            <div className='fixed inset-0 bg-gray-900 z-[100] overflow-y-auto custom-scrollbar'>
                <div className='min-h-screen w-full px-4 sm:px-6 md:px-8 lg:px-10 py-6'>
                    {/* Top Bar with Search and Close */}
                    <div className='flex items-center justify-between gap-4 mb-8'>
                        {/* Search Input */}
                        <div className='flex-1 flex items-center border-b-2 border-gray-600 focus-within:border-white transition-all duration-300'>
                            <svg
                                className='w-6 h-6 text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                ></path>
                            </svg>
                            <input
                                type='text'
                                placeholder='Search movie, tv, people...'
                                value={searchQuery}
                                onChange={handleSearch}
                                autoFocus
                                className='flex-1 bg-transparent text-white text-lg sm:text-xl placeholder-gray-400 px-4 py-3 focus:outline-none'
                            />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => {
                                setIsSearchOpen(false);
                                setSearchQuery('');
                            }}
                            className='flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-all duration-300 cursor-pointer'
                        >
                            <svg
                                className='w-7 h-7 text-white'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                                xmlns='http://www.w3.org/2000/svg'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth='2'
                                    d='M6 18L18 6M6 6l12 12'
                                ></path>
                            </svg>
                        </button>
                    </div>

                    {/* Search Results */}
                    <div className='mt-8'>
                        {searchLoading ? (
                            <div className='text-center text-gray-400 mt-20'>
                                <div className='inline-block w-12 h-12 border-4 border-gray-600 border-t-white rounded-full animate-spin mb-4'></div>
                                <p className='text-lg'>Searching...</p>
                                <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4'>

                                </div>
                            </div>
                        ) : searchError ? (
                            <div className='text-center text-red-400 mt-20'>
                                <p className='text-lg'>Error: {searchError}</p>
                            </div>
                        ) : searchQuery && searchQuery.trim().length >= 2 ? (
                            searchResults && searchResults.length > 0 ? (
                                <div>
                                    <h2 className='text-white text-xl sm:text-2xl font-semibold mb-6'>
                                        {totalResults ? `${totalResults} results` : 'Results'} for "{searchQuery}"
                                    </h2>
                                    <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
                                        {searchResults.map((result) => {
                                            const type = result.media_type || result.type || 'unknown';
                                            const gradientClass = getGradientClass(type);

                                            return (
                                                <div key={result.id} className='cursor-pointer group'
                                                    onClick={() => handleNavigateDetail(result)}>
                                                    <div className='relative overflow-hidden rounded-lg mb-2 transform transition-all duration-300 group-hover:scale-101 group-hover:shadow-sm'>
                                                        <img
                                                            src={getImageSrc(result)}
                                                            alt={result.title || result.name}
                                                            className='w-full h-34 sm:h-36 object-cover'
                                                            onError={(e) => {
                                                                e.target.src = 'https://via.placeholder.com/500x281?text=No+Image';
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
                                                    <h3 className='text-white text-xs font-semibold truncate'>
                                                        {result.title || result.name}
                                                    </h3>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className='text-center text-gray-400 mt-20'>
                                    <p className='text-lg'>No results found for "{searchQuery}"</p>
                                </div>
                            )
                        ) : (
                            <div className='text-center text-gray-400 mt-20'>
                                <svg
                                    className='w-16 h-16 mx-auto mb-4 opacity-50'
                                    fill='none'
                                    stroke='currentColor'
                                    viewBox='0 0 24 24'
                                    xmlns='http://www.w3.org/2000/svg'
                                >
                                    <path
                                        strokeLinecap='round'
                                        strokeLinejoin='round'
                                        strokeWidth='2'
                                        d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
                                    ></path>
                                </svg>
                                <p className='text-lg'>Start typing to search...</p>
                                <p className='text-sm mt-2'>Enter at least 2 characters</p>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </>
    )
}

export default SearchOverlay;