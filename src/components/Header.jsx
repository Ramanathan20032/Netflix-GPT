import React, { useEffect, useRef, useState } from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'
import netflix_avatar from '../assets/images/netflix-profile.jpg'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate, useLocation, Link, useMatch } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/slices/userSlice';
import SearchOverlay from './SearchPage/SearchOverlay';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const favoritesCount = useSelector(store => store.favorites.favoritesItems.length);

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
        // Only redirect if on login/home
        if (location.pathname === "/") {
          navigate("/browse");
        }
      } else {
        // User is signed out
        dispatch(removeUser())
        navigate("/")
      }
    });

    return () => unsubscribed();

  }, [dispatch, location, navigate]);

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


  return (
    <>
      <div className='fixed w-full bg-gradient-to-b from-black/100 pl-1 px-3 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-4 flex justify-between items-center z-50'>
        <Link to="/browse">
          <img src={netflix_logo} className='w-28 sm:w-36 md:w-44 cursor-pointer' alt='logo' />
        </Link>

        {user && (
          <div className='flex items-center gap-x-2 sm:gap-x-3'>

            {!hideSearch &&
              <div className='flex items-center relative cursor-pointer'>
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
              </div>
            }

            {/* Favorites/Bucket icon with badge */}
            <div className='relative flex items-center justify-center mr-1.5 cursor-pointer'
              onClick={() => navigate('/favorites')}>
              <div className='flex items-center justify-center w-8.5 h-8.5 sm:w-10 sm:h-10 rounded-full border border-white/50 hover:border-white transition-all duration-300 bg-black/40'>
                {/* Heroicons Outline - ShoppingBag (bucket) */}
                <svg
                  className='w-5 h-5 text-red-400'
                  fill='none'
                  stroke='currentColor'
                  viewBox='0 0 24 24'
                  xmlns='http://www.w3.org/2000/svg'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    strokeWidth={2.2}
                    d='M5.5 7l1.5 12a2 2 0 002 1.5h6a2 2 0 002-1.5l1.5-12H5.5zm10.5 0a3.5 3.5 0 01-7 0' />
                </svg>
                {/* Badge - top right */}
                {favoritesCount > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-500 text-white text-xs font-medium rounded-full px-1.5 py-0.5 shadow">
                    {favoritesCount}
                  </span>
                )}
              </div>
            </div>

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
        <SearchOverlay setIsSearchOpen={setIsSearchOpen} />
      )}
    </>
  )
}

export default Header