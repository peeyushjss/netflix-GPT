// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCH6e2Dw8LgoTz2mjL49NxZrSONKfHiKTo",
  authDomain: "netflixgpt-ada64.firebaseapp.com",
  projectId: "netflixgpt-ada64",
  storageBucket: "netflixgpt-ada64.appspot.com",
  messagingSenderId: "923151030766",
  appId: "1:923151030766:web:da195e056059c1ddbe96ff",
  measurementId: "G-G5CRYNWL42"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();