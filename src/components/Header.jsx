import React, { useEffect, useRef, useState } from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'
import netflix_avatar from '../assets/images/netflix-profile.jpg'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/slices/userSlice';
import { Link, useLocation, useMatch } from 'react-router-dom';
import { multiSearchThunk } from '../store/thunks/multiSearchThunk'
import { clearResultsOnNewQuery, clearSearch } from '../store/slices/multiSearchSlice';
import { IMAGE_BASE_URL } from '../utils/constants'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const { searchLoading, searchError, searchResults, totalResults } = useSelector((store) => store.multiSearch)
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const debounceTimer = useRef(null);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

  // ! lock body scroll when the search modal is open
  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = "hidden"; // Disable background scroll
    } else {
      document.body.style.overflow = "auto"; // Restore scroll
    }

    return () => {
      document.body.style.overflow = "auto"; // Clean up if unmounted
    };
  }, [isSearchOpen]);

  // ! Auth State Changed Listener [sgnIn / signOut] eventListener
  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
        // ? console.log("User is signed in", user)
        navigate("/browse")
      } else {
        // User is signed out
        dispatch(removeUser())
        // ? console.log("User is signed out", user)
        navigate("/")
      }
    });

    return () => unsubscribed();

  }, [])

  // ! use if u have hardcoded urls
  // const location = useLocation();
  // const hideSearch = location.pathname.includes('/people/') || location.pathname.includes('/suggestions');

  // ! if u have dynamic urls then use [useMatch]
  const hideSearchRoutes = [
    // "/:mediaType/:movieId",
    // "/people/:personId",
    "/:mediaType/:movieId/people/:type",
    "/:mediaType/:movieId/suggestions/:type"
  ]
  const matchesUrls = hideSearchRoutes.map((pattern) => useMatch(pattern));
  const hideSearch = matchesUrls.some(Boolean);


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
      <div className='fixed w-full bg-gradient-to-b from-black/100 px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-4 flex justify-between items-center z-50'>
        <Link to="/browse">
          <img src={netflix_logo} className='w-28 sm:w-36 md:w-44 cursor-pointer' alt='logo' />
        </Link>

        {user && (
          <div className='flex items-center gap-x-2 sm:gap-x-3'>

            {/* input serach component */}
            {!hideSearch &&
              <div className='flex items-center relative mr-1.5 cursor-pointer'>
                {/* Mobile: Icon only with circular border */}
                <div className='flex items-center justify-center w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-[20px] border border-white/50 hover:border-white transition-all duration-300'
                  onClick={() => setIsSearchOpen(true)}>
                  <svg
                    className='w-4.5 sm:w-5 h-4.5 sm:w-5 text-white'
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
                </div>

                {/* Desktop: Full search bar from sm onwards */}
                {/* <div className='hidden sm:flex items-center relative'
                  onClick={() => setIsSearchOpen(true)}>
                  <svg
                    className='w-5 h-5 text-white absolute left-3'
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
                    placeholder='Search...'
                    className='bg-black bg-opacity-70 text-white placeholder-gray-400 border border-white/50 rounded py-1 sm:py-1.5 pl-10 pr-4 focus:outline-none focus:border-white w-50 md:w-60 lg:w-75 transition-all duration-300'
                  />
                </div> */}
              </div>
            }

            {/* Avatar with Dropdown */}
            <div
              className='relative group'
              onClick={() => setShowDropdown(true)}
              onMouseEnter={() => setShowDropdown(true)}
              onMouseLeave={() => {
                // Add a small delay to allow moving to dropdown
                setTimeout(() => {
                  if (!document.querySelector('.dropdown-menu:hover')) {
                    setShowDropdown(false);
                  }
                }, 150);
              }}
            >
              <img
                src={netflix_avatar}
                className='w-8 sm:w-9 md:w-9.5 rounded-md cursor-pointer transition-all duration-300 hover:ring-1 hover:ring-[#FAF9EE] hover:ring-opacity-100'
                alt='avatar'
              />

              {/* Dropdown Menu */}
              {showDropdown && (
                <div
                  className='absolute right-0 top-full mt-2 bg-black bg-opacity-90 backdrop-blur-sm border border-white/25 rounded-md shadow-xl min-w-[200px] z-60 dropdown-menu'
                  onMouseEnter={() => setShowDropdown(true)}
                  onMouseLeave={() => setShowDropdown(false)}
                >
                  {/* Arrow pointer */}
                  <div className='absolute -top-1 right-4 w-2 h-2 bg-black bg-opacity-90 border-l border-t border-gray-600 transform rotate-45'></div>

                  <div className='p-3'>
                    {/* User Info Section */}
                    <div className='flex items-center gap-3 pb-0.5'>
                      <div>
                        <p className='text-white font-semibold text-md'>
                          {user.displayName || 'Netflix User'}
                        </p>
                        <p className='text-gray-400 text-sm'>
                          {user.email}
                        </p>
                      </div>
                    </div>

                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleSignOut}
              className='text-sm md:text-md font-bold border border-white bg-white/90 text-black hover:bg-transparent hover:text-white rounded-md px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 cursor-pointer tracking-wider'
            >
              Sign Out
            </button>
          </div>
        )}
      </div>

      {/* Search Panel Overlay */}
      {isSearchOpen && (
        // <div className='fixed inset-0 bg-gray-900 z-[100] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>
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
      )}
    </>
  )
}

export default Header