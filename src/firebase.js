// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBFaYVU2Tutelun6fNI5MG75Qz3zZm8X4k",
  authDomain: "moviesmate-32fd0.firebaseapp.com",
  projectId: "moviesmate-32fd0",
  storageBucket: "moviesmate-32fd0.firebasestorage.app",
  messagingSenderId: "6345382009",
  appId: "1:6345382009:web:baa0cc722fa5b6df1f1ca8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
