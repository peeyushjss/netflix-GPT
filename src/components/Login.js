import React, { useRef, useState } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
import { USER_AVATAR } from '../utils/constants';

const Login = () => {
  const navigate = useNavigate(),
    dispatch = useDispatch(),
    [isSignInForm, setIsSignInForm] = useState(true),
    [errormessage, setErrorMessage] = useState(null);

  const fullName = useRef(null),
    email = useRef(null),
    password = useRef(null);

  const toggleSignInForm = () => {
    setIsSignInForm(!isSignInForm);
  };

  const handleButtonClick = () => {
    const message = checkValidData(email.current.value, password.current.value);
    setErrorMessage(message);

    if (message) return;

    if (!isSignInForm) {
      // logic for sign up
      createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: fullName.current.value, photoURL: USER_AVATAR
          }).then(() => {
            const { uid, email, displayName, photoURL } = auth.currentUser;
            dispatch(addUser({ uid: uid, email: email, displayName: displayName, photoURL: photoURL }));
            // navigate('/browse');
          }).catch((error) => {
            setErrorMessage(error.message);
            navigate('/error');
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    } else {
      // logic for sign in
      signInWithEmailAndPassword(auth, email.current.value, password.current.value)
        .then((userCredential) => {
          const user = userCredential.user;
          // navigate('/browse');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + '-' + errorMessage);
        });
    }
  };

  return (
    <div>
      <Header />
      <div className='absolute'>
        <img src='https://assets.nflxext.com/ffe/siteui/vlv3/ab180a27-b661-44d7-a6d9-940cb32f2f4a/7fb62e44-31fd-4e1f-b6ad-0b5c8c2a20ef/IN-en-20231009-popsignuptwoweeks-perspective_alpha_website_large.jpg' alt='logo' />
      </div>
      <form onSubmit={(e) => { e.preventDefault(); }} className='w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-xl bg-opacity-80'>
        <h1 className='font-bold text-3xl py-4'>{isSignInForm ? 'Sign In' : 'Sign Up'}</h1>
        {!isSignInForm && <input ref={fullName} type='text' placeholder='Full Name' className='p-4 my-4 w-full bg-gray-700' />}
        <input ref={email} type='text' placeholder='Email Address' className='p-4 my-4 w-full bg-gray-700' />
        <input ref={password} type='password' placeholder='Password' className='p-4 my-4 w-full bg-gray-700' />
        <p className='text-red-500 font-bold text-lg py-2'>{errormessage}</p>
        <button className='p-2 my-6 bg-red-700 w-full rounded-xl' onClick={handleButtonClick}>{isSignInForm ? 'Sign In' : 'Sign Up'}</button>
        <p className='py-4 cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? 'New to Netflix? Sign Up' : 'Already registered? Sign In'}</p>
      </form>
    </div>
  )
}

export default Login;