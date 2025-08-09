// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDD-eExuzAx-Fz4H76R3UV_xA302n-nNL8",
  authDomain: "netflix-gpt-ae609.firebaseapp.com",
  projectId: "netflix-gpt-ae609",
  storageBucket: "netflix-gpt-ae609.firebasestorage.app",
  messagingSenderId: "380559851668",
  appId: "1:380559851668:web:692a31d5a0cec3ab577481",
  measurementId: "G-GY3T08KR4J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth();