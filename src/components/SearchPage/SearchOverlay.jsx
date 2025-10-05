import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { multiSearchThunk } from '../../store/thunks/multiSearchThunk'
import { clearResultsOnNewQuery, clearSearch } from '../../store/slices/multiSearchSlice';
import SearchResultCard from "./SearchResultCard";


const SearchOverlay = ({ setIsSearchOpen }) => {
    const dispatch = useDispatch();
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
                                        {searchResults.map((result) => (
                                            <SearchResultCard key={result.id} result={result} setIsSearchOpen={setIsSearchOpen} />
                                        ))}
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