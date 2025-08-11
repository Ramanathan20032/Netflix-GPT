import React, { useState, useRef } from 'react';
import Header from './Header';
import toast from 'react-hot-toast';
import Toast from './Toast';

import { signInWithEmailAndPassword, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';

// ! Images
import netflix_banner from '../assets/images/netflix-banner.jpg';
import password_open from '../assets/images/password_shown_new.png';
import password_closed from '../assets/images/password_hidden_new.png';

// ! Utils
import { checkValidEmail, checkValidPassword, checkValidFullName } from '../utils/validate';


const Login = () => {
  const navigate = useNavigate();

  const [passwordToggle, setPasswordToggle] = useState(false);
  const [isSignin, setIsSignin] = useState(true);
  const fullNameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [emailError, setEmailError] = useState(null)
  const [passwordError, setPasswordError] = useState(null)
  const [fullNameError, setFullNameError] = useState(null);
  const [loginError, setLoginError] = useState(null);

  const toggleSignInForm = () => {
    setIsSignin(!isSignin)
    setPasswordToggle(false)

    // Clear the form fields on switch the signIn/signUp
    if (emailRef.current) emailRef.current.value = ''
    if (passwordRef.current) passwordRef.current.value = '';

    // Clear the errors on switch the signIn/signUp
    setEmailError(null)
    setPasswordError(null)
    setFullNameError(null)
    setLoginError(null)
  }

  // ! Handle SignIn/SignUp Button Click
  const handleButtonClick = () => {
    // Clear any previous login errors
    setLoginError(null);

    // Validate the form data
    const emailValidateError = checkValidEmail(emailRef.current.value)
    const passwordValidateError = checkValidPassword(passwordRef.current.value)
    const fullNameValidateError = !isSignin ? checkValidFullName(fullNameRef.current.value) : null;

    // Set validation errors
    setEmailError(emailValidateError)
    setPasswordError(passwordValidateError)
    setFullNameError(fullNameValidateError)

    // Check if all validations pass
    const hasErrors = emailValidateError || passwordValidateError || (!isSignin && fullNameValidateError);

    if (hasErrors) return; // Early return if there are validation errors

    // Clear form fields
    const clearFormFields = () => {
      emailRef.current.value = ''
      passwordRef.current.value = ''
      if (!isSignin && fullNameRef.current) {
        fullNameRef.current.value = ''
      }
    }

    // Handle authentication
    if (isSignin) {
      // * Sign in logic with Firebase Auth
      signInWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Reload user to get the latest profile data including displayName
          return userCredential.user.reload().then(() => userCredential.user);
        })
        .then((user) => {
          // ? console.log('User signed in successfully:', user);
          clearFormFields();
          // ! navigate("/browse")
        })
        .catch((error) => {
          // ? console.log('User Sign-in Error', error.code, error.message);
          setLoginError(`${error.code} - ${error.message}`);
        });
    } else {
      // * Sign up logic with Firebase Auth
      const fullName = fullNameRef.current.value;

      createUserWithEmailAndPassword(auth, emailRef.current.value, passwordRef.current.value)
        .then((userCredential) => {
          // Update the user's profile with their full name
          return updateProfile(userCredential.user, {
            displayName: fullName
          });
        })
        .then(() => {
          // Force a reload of the user to get the updated profile
          return auth.currentUser.reload();
        })
        .then(() => {
          // Now get the updated user object
          const updatedUser = auth.currentUser;
          // ? console.log('User signed up successfully:', updatedUser);
          clearFormFields();
          // Switch to signin form instead of navigating to browse
          // ! setIsSignin(true);
          toast.success('User Signed Up Successfully!')
        })
        .catch((error) => {
          // ? console.log('User Sign-up Error', error.code, error.message);
          setLoginError(`${error.code} - ${error.message}`);
        });
    }
  }

  const handleInputChange = (field) => {
    // Clear login error when user starts typing
    setLoginError(null)

    if (field === 'email')
      setEmailError(null)
    if (field === 'password')
      setPasswordError(null)
    if (field === 'fullName')
      setFullNameError(null)
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
                onChange={() => handleInputChange('fullName')}
              />
              <p className='text-red-400 text-sm px-1 min-h-5'>{fullNameError}</p>
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

        {loginError && <p className='text-red-400 text-sm px-1 min-h-5'>{loginError}</p>}

        <button className="px-2 py-2.5 my-3 mt-5 w-[93%] text-white text-lg font-medium bg-red-600 hover:bg-red-700 transition-all duration-300 rounded-md cursor-pointer"
          onClick={handleButtonClick}>
          {isSignin ? 'Sign In' : 'Sign Up'}
        </button>

        <p className='py-2 text-left text-md text-gray-300 w-[93%]'>{isSignin ? 'New to Netflix?' : 'Already a User!'}
          <span onClick={toggleSignInForm} className='cursor-pointer text-white text-md hover:text-red-400 transition-all duration-300 underline ps-1.5'>{!isSignin ? 'Sign In.' : 'Sign Up Now.'}</span>
        </p>
      </form>

      {/* Toast Notifications */}
      <Toast />
    </div>
  );
};

export default Login;