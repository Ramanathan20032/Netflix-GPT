import React, { useEffect } from 'react'
import { RouterProvider, createBrowserRouter, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../slices/userSlice';

import Login from './Login'
import Browse from './Browse'
import Error from './Error'


const Body = () => {

  const dispatch = useDispatch();
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Login />
    },
    {
      path: "/browse",
      element: <Browse />
    },
    {
      path: "*",
      element: <Error />
    }
  ])

  useEffect(() => {
    // * Auth State Changed Listener [signIn / signOut] eve
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const { uid, email, displayName } = user;
        dispatch(addUser({ uid: uid, email: email, displayName: displayName }))
      } else {
        // User is signed out
        dispatch(removeUser())
      }
    });

  }, [])

  return (
    <RouterProvider router={appRouter} />
  )
}

export default Body;