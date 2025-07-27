import React, { useState, useRef } from 'react';
import Header from './Header';

// import { useNavigate } from 'react-router-dom';

// ! Images
import netflix_banner from '../assets/images/netflix-banner.jpg';
import password_open from '../assets/images/password_shown_new.png';
import password_closed from '../assets/images/password_hidden_new.png';

// ! Utils
import { checkValidEmail, checkValidPassword } from '../utils/validate';


const Login = () => {

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  // const navigate = useNavigate();

  const toggleSignInForm = () => {
    setIsSignin(!isSignin)

    // Clear the form fields on switch the signIn/signUp
    if (emailRef.current) emailRef.current.value = ''
    if (passwordRef.current) passwordRef.current.value = '';

    // Clear the errors on switch the signIn/signUp
    setEmailError(null)
    setPasswordError(null)
  }

  const handleButtonClick = () => {
    // Validate the form data
    const emailValidateError = checkValidEmail(emailRef.current.value)
    const passwordValidateError = checkValidPassword(passwordRef.current.value)
    setEmailError(emailValidateError)
    setPasswordError(passwordValidateError)

    // If there is no error, then sign in or sign up
    // ! TODO: Add sign in and sign up logic to the backend
    if (!emailValidateError && !passwordValidateError) {
      // console.log('form is valid')
      // sign in
      if (isSignin) {
        console.log('Sign-in Details', {
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      }
      // sign up
      if (!isSignin) {
        console.log('Sign-up Details', {
          fullName: fullNameRef.current.value,
          email: emailRef.current.value,
          password: passwordRef.current.value
        })
      }
    }
  }

  const handleInputChange = (field) => {
    if (field === 'email')
      setEmailError(null)
    if (field === 'password')
      setPasswordError(null)
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
      <form onSubmit={(e) => e.preventDefault()} className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/60 px-8 py-16 rounded-lg z-20 text-white flex flex-col items-center w-1/3">
        <h1 className="w-full text-3xl font-semibold text-start px-3.5 mb-4">{isSignin ? 'Sign In' : 'Sign Up'}</h1>

        <div className='w-[93%]'>
          {!isSignin &&
            <div className="relative">
              <input
                ref={fullNameRef}
                type="text"
                placeholder="Full Name"
                className="px-3 py-3 mt-3 mb-0 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg tracking-wider font-medium"
              />
              <p className='text-red-400 text-sm px-1 min-h-5'>{}</p>
            </div>
          }

          <div className="relative">
            <input
              ref={emailRef}
              type="text"
              placeholder="Email Address"
              className="px-3 py-3 mt-3 mb-1 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg tracking-wider font-medium"
              onChange={() => handleInputChange('email')}
            />
          </div>
          <p className='text-red-400 text-sm px-1 min-h-5'>{emailError}</p>

          <div className="relative">
            <input
              ref={passwordRef}
              type={passwordToggle ? 'text' : 'password'}
              placeholder="Password"
              className="px-3 py-3 mt-3 mb-1 w-[100%] border-none focus:outline-none focus:bg-[#393E46]/100 bg-[#393E46]/80 text-white rounded-lg text-lg tracking-wider font-medium"
              onChange={() => handleInputChange('password')}
            />
            <img src={passwordToggle ? password_open : password_closed} onClick={() => setPasswordToggle(!passwordToggle)} alt="password_open" className='absolute mt-1 right-3.5 top-1/2 -translate-y-1/2 w-5 h-5 cursor-pointer' />
          </div>
          <p className='text-red-400 text-sm px-1 min-h-5'>{passwordError}</p>
        </div>

        <button className="px-2 py-2.5 my-3 mt-5 w-[93%] text-white text-lg font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-md cursor-pointer"
          onClick={handleButtonClick}>
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