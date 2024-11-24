import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, setDoc } from "firebase/firestore";

// Assign third-party register providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Custom hook to handle authentication
export const useAuth = () => {
  const navigate = useNavigate(); // Get the navigate function
  const usersRef = collection(db, "users"); //adding reference to the users collection

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info
        const user = result.user;
        //create unique doc for the new user including all his relevant information.
        setDoc(doc(usersRef, user.uid), {
          email: user.email,
          id: user.uid,
          name: user.displayName,
          image: user.photoURL,
          movies: {
            favourites: [],
            watched: [],
          },
        });
        //persist authentication data
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userID", user.uid);
        // Navigate after successful login
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const handleFacebookSignup = () => {
    console.log("facebook");

    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        //create unique doc for the new user including all his relevant information.
        setDoc(doc(usersRef, user.uid), {
          email: user.email,
          id: user.uid,
          name: user.displayName,
          image: user.photoURL,
          movies: {
            favourites: [],
            watched: [],
          },
        });

        //persist authentication data
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userEmail", user.email);
        localStorage.setItem("userID", user.uid);

        // Navigate after successful login
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  return {
    handleGoogleSignup,
    handleFacebookSignup,
  };
};
