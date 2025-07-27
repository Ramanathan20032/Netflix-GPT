import React, { useState } from 'react';
import Header from './Header';
// import { useNavigate } from 'react-router-dom';

// ! Images
import netflix_banner from '../assets/images/netflix-banner.jpg';
import password_open from '../assets/images/password_shown_new.png';
import password_closed from '../assets/images/password_hidden_new.png';

const Login = () => {

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  // const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignin(!isSignin)
  }

  return (
    <div className="relative h-screen w-full">
      <Header />

      {/* Banner Image */}
      <img
        src={netflix_banner}
        alt="banner"
        className="w-full h-full object-cover"
      />

      {/* Gradient Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/85 to-transparent z-10" />

      {/* Form Over Banner */}
      <form className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 px-8 py-16 rounded-lg z-20 text-white flex flex-col items-center w-1/3">
        <h1 className="w-full text-3xl font-semibold text-start px-3.5 mb-4">{isSignin ? 'Sign In' : 'Sign Up'}</h1>

        <div className='w-[93%]'>

          {!isSignin &&
            <div className="relative">
              <input
                type="text"
                placeholder="Full Name"
                className="px-3 py-3 my-3 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg font-medium"
              />
            </div>
          }

          <div className="relative">
            <input
              type="email"
              placeholder="Email Address"
              className="px-3 py-3 my-3 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg font-medium"
            />
          </div>

          <div className="relative">
            <input
              type="password"
              placeholder="Password"
              className="px-3 py-3 my-3 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg font-medium"
            />
            <img src={passwordToggle ? password_open : password_closed} onClick={() => setPasswordToggle(!passwordToggle)} alt="password_open" className='absolute right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer' />
          </div>
        </div>

        <button className="px-2 py-2.5 my-3 mt-5 w-[93%] text-white text-lg font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-md cursor-pointer">
          {isSignin ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='py-2 text-left text-md text-gray-300 w-[93%]'>{isSignin ? 'New to Netflix?' : 'Already a User!'}
          <span onClick={toggleSignInForm} className='cursor-pointer text-white text-md hover:text-red-400 transition-all duration-300 underline ps-1.5'>{!isSignin ? 'Sign In.' : 'Sign Up Now.'}</span>
        </p>
      </form>
    </div>
  );
};

export default Login;