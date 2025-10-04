import React, { useEffect, useState } from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'
import netflix_avatar from '../assets/images/netflix-profile.jpg'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/slices/userSlice';
import { Link, useLocation, useMatch } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);

  // ! use if u have hardcoded urls
  // const location = useLocation();
  // const hideSearch = location.pathname.includes('/people/') || location.pathname.includes('/suggestions');

  // ! if u have dynamic urls then use [useMatch]
  const hideSearchRoutes = [
    "/:mediaType/:movieId",
    "/people/:personId",
    "/:mediaType/:movieId/people/:type",
    "/:mediaType/:movieId/suggestions/:type"
  ]
  const matchesUrls = hideSearchRoutes.map((pattern) => useMatch(pattern));
  const hideSearch = matchesUrls.some(Boolean);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // navigate("/")
    }).catch((error) => {
      navigate("/error")
    });
  }

  useEffect(() => {
    // * Auth State Changed Listener [signIn / signOut] eventListener
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

  return (
    <div className='fixed w-full bg-gradient-to-b from-black/100 px-4 sm:px-6 md:px-8 lg:px-10 py-5 sm:py-4 flex justify-between items-center z-50'>
      <Link to="/browse">
        <img src={netflix_logo} className='w-28 sm:w-36 md:w-44 cursor-pointer' alt='logo' />
      </Link>

      {user && (
        <div className='flex items-center gap-x-2 sm:gap-x-3'>

          {/* input serach component */}
          {!hideSearch &&
            <div className='flex items-center relative mr-1.5 mr-1 sm:mr-2 cursor-pointer'>
              {/* Mobile: Icon only with circular border */}
              <div className='flex sm:hidden items-center justify-center w-9 h-9 rounded-[18px] border border-white/50 hover:border-white transition-all duration-300'>
                <svg
                  className='w-5 h-5 text-white'
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
              <div className='hidden sm:flex items-center relative'>
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
                  placeholder='movie, tv, people...'
                  className='bg-black bg-opacity-70 text-white placeholder-gray-400 border border-white/50 rounded py-1 sm:py-1.5 pl-10 pr-4 focus:outline-none focus:border-white w-50 md:w-60 lg:w-75 transition-all duration-300'
                />
              </div>
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
  )
}

export default Header