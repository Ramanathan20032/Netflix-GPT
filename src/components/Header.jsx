import React, { useEffect, useState } from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'
import netflix_avatar from '../assets/images/netflix-profile.jpg'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/slices/userSlice';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const [showDropdown, setShowDropdown] = useState(false);

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
    <div className='fixed w-full bg-gradient-to-b from-black/85 px-10 py-3 flex justify-between items-center z-50'>
      <Link to="/browse">
        <img src={netflix_logo} className='w-44 cursor-pointer' alt='logo' />
      </Link>

      {user && (
        <div className='flex items-center gap-x-3'>
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
              className='w-9.5 rounded-md cursor-pointer transition-all duration-300 hover:ring-1 hover:ring-[#FAF9EE] hover:ring-opacity-100'
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

                  {/* Menu Items */}
                  {/* <div className='pt-2 space-y-1'>
                    <button className='w-full text-left text-white hover:bg-gray-700 hover:bg-opacity-50 px-2 py-2 rounded text-sm transition-colors duration-200'>
                      Manage Profiles
                    </button>
                    <button className='w-full text-left text-white hover:bg-gray-700 hover:bg-opacity-50 px-2 py-2 rounded text-sm transition-colors duration-200'>
                      Account
                    </button>
                    <button className='w-full text-left text-white hover:bg-gray-700 hover:bg-opacity-50 px-2 py-2 rounded text-sm transition-colors duration-200'>
                      Help Center
                    </button>
                    <hr className='border-gray-600 my-2' />
                    <button
                      onClick={handleSignOut}
                      className='w-full text-left text-white hover:bg-gray-700 hover:bg-opacity-50 px-2 py-2 rounded text-sm transition-colors duration-200'
                    >
                      Sign out of Netflix
                    </button>
                  </div> */}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={handleSignOut}
            className='text-white text-md font-semibold border border-white rounded-md px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'
          >
            Sign Out
          </button>
        </div>
      )}
    </div>
  )
}

export default Header