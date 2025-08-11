import React, { useEffect } from 'react'
import netflix_logo from '../assets/logo/netflix-logo.png'
import netflix_avatar from '../assets/images/netflix-profile.jpg'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addUser, removeUser } from '../store/slices/userSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

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
        // ?console.log("User is signed out", user)
        navigate("/")
      }
    });

    return () => unsubscribed();

  }, [])

  return (
    <div className='absolute w-full bg-gradient-to-b from-black/85 px-10 py-3 flex justify-between items-center'>
      <img src={netflix_logo} className='w-44' alt='logo' />
      {user && <div className='flex items-center gap-x-3'>
        <img src={netflix_avatar} className='w-9.5 rounded-md' alt='avatar' />
        <button onClick={handleSignOut} className='text-white text-md font-semibold border border-white rounded-md px-4 py-1.5 hover:bg-white hover:text-black transition-all duration-300 cursor-pointer'>Sign Out</button>
      </div>}
    </div>
  )
}

export default Header