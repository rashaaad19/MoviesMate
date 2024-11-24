import { useNavigate } from "react-router-dom"; // Import useNavigate
import {
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  getAdditionalUserInfo,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { collection, doc, getDoc, setDoc } from "firebase/firestore";
import { userNameGenerator } from "../utilties/functions";

// Assign third-party register providers
const googleProvider = new GoogleAuthProvider();
const facebookProvider = new FacebookAuthProvider();

// Custom hook to handle authentication
export const useAuth = () => {
  const navigate = useNavigate(); // Get the navigate function
  const usersRef = collection(db, "users"); //adding reference to the users collection

  const handleGoogleSignup = () => {
    signInWithPopup(auth, googleProvider)
      .then(async (result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info
        const user = result.user;
        // Fetch the current user document (if it exists)
        const userDocRef = doc(usersRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        //checking if it's existing or new user
        const isNewUser = getAdditionalUserInfo(result).isNewUser;
        //create unique doc for the new user including all his relevant information.
        let userDoc = {
          email: user.email,
          id: user.uid,
          name: user.displayName,
          image: user.photoURL,
        };
        // add userName and empty movie library if it's a new user
        if (isNewUser) {
          //generating new user name
          const userName = await userNameGenerator(user.displayName);
          userDoc.userName = userName;
          userDoc.movies = {
            favourites: [],
            watched: [],
          };
        } else if (userDocSnapshot.exists()) {
          // If the user exists, retain the existing data
          userDoc = {
            ...userDocSnapshot.data(),
          };
        }
        //save the updated or new document
        await setDoc(userDocRef, userDoc);

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
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  const handleFacebookSignup = () => {
    signInWithPopup(auth, facebookProvider)
      .then(async (result) => {
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;

        // Fetch the current user document (if it exists)
        const userDocRef = doc(usersRef, user.uid);
        const userDocSnapshot = await getDoc(userDocRef);

        //checking if it's existing or new user
        const isNewUser = getAdditionalUserInfo(result).isNewUser;
        //extracting user facebook image
        const facebookImg = user.photoURL + "?height=300&access_token=" + token;
        //create unique doc for the new user including all his relevant information.
        let userDoc = {
          email: user.email,
          id: user.uid,
          name: user.displayName,
          image: facebookImg,
        };
        // add userName and empty movie library if it's a new user
        if (isNewUser) {
          //generating new user name
          const userName = await userNameGenerator(user.displayName);
          userDoc.userName = userName;
          userDoc.movies = {
            favourites: [],
            watched: [],
          };
        } else if (userDocSnapshot.exists()) {
          // If the user exists, retain the existing data
          userDoc = {
            ...userDocSnapshot.data(),
          };
        }
        //save the updated or new document
        await setDoc(userDocRef, userDoc);

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
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log(error);
      });
  };

  return {
    handleGoogleSignup,
    handleFacebookSignup,
  };
};
