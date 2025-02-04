import { Link, redirect, useNavigate } from "react-router-dom";

import "./Register.scss";

import { useRef, useState } from "react";
import { useAuth } from "../hooks/useAuth";

import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";

import { userNameGenerator, validatePassword } from "../utilties/functions";
import { collection, doc, setDoc } from "firebase/firestore";
import LoadingScreen from "../UI/LoadingScreen";

const Signup = () => {
  const [passwordIsInvalid, setPasswordIsInvalid] = useState({
    invalid: false,
    errorType: "",
  });

  const [emailIsInvalid, setEmailIsInvalid] = useState({
    invalid: false,
    errorType: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); //extracting navigate function
  const { handleFacebookSignup, handleGoogleSignup, loading, error } =
    useAuth(); //extract third party register custom hooks
  const usersRef = collection(db, "users"); //adding reference to the users collection

  // reference to manipulate input elements
  const emailRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const passwordRef = useRef(null);

  // if (loading || isLoading) {
  //   return <LoadingScreen />;
  // }
  //get all users usernames to check availability

  const handleOnSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    //handling input data
    const data = new FormData(event.target);
    const name = data.get("name");
    const email = data.get("email");
    const password = data.get("password");
    const confirmPasword = data.get("confirmPassword");
    const userData = {
      userName: name,
      userEmail: email,
      userPassword: password,
      confirmUserPassword: confirmPasword,
    };

    //password validation
    if (password !== confirmPasword) {
      setPasswordIsInvalid({
        invalid: true,
        errorType: "passwords does not match",
      });
      setIsLoading(false);
      confirmPasswordRef.current.focus();
    } else if (userData.userPassword.length < 6) {
      setPasswordIsInvalid({ invalid: true, errorType: "password too short" });
      setIsLoading(false);
      passwordRef.current.focus();
    } else if (validatePassword(userData.userPassword) !== true) {
      setPasswordIsInvalid({
        invalid: true,
        errorType: "no capital and special characters",
      });
      setIsLoading(false);
      passwordRef.current.focus();
    }

    //creating new user
    else {
      //reseting password error state
      setPasswordIsInvalid({ invalid: false, errorType: "" });
      //generating new user name
      const userName = await userNameGenerator(userData.userName);
      //proceed to create new user
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const userInfo = userCredential.user;
          //create unique doc for the new user including all his relevant information.
          setDoc(doc(usersRef, userInfo.uid), {
            email: userInfo.email,
            id: userInfo.uid,
            userName: userName,
            name: userData.userName,
            image: userInfo.photoURL,
            movies: {
              favourites: [],
              watched: [],
              reviews: [],
            },
          });

          // Persist authentication data
          localStorage.setItem("isAuth", "true");
          localStorage.setItem("userEmail", userData.userEmail);
          localStorage.setItem("userID", userInfo.uid);
          setIsLoading(false);
          setEmailIsInvalid({ invalid: false, errorType: "" });
          //navigate to root page
          navigate("/");
        })
        .catch((error) => {
          setIsLoading(false);
          const errorMessage = error.message;
          // console.log(error.message);
          if (errorMessage === "Firebase: Error (auth/email-already-in-use).") {
            setEmailIsInvalid({ invalid: true, errorType: "email exists" });
            emailRef.current.focus();
            // console.log(errorMessage, emailIsInvalid);
          }
        });
    }
  };

  return (
    <div className="registerForm-container">
      <form role="form" className="registerForm" onSubmit={handleOnSubmit}>
        {/* {(loading||isLoading) && <LoadingScreen />} */}
        <h1>Let&apos;s get started.</h1>
        <div className="registerInput-container">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            className={emailIsInvalid.invalid ? "errorBorder" : ""}
            ref={emailRef}
            required
          />
          {emailIsInvalid.errorType === "email exists" && (
            <p className="errorMessage">Email already exists</p>
          )}
        </div>
        <div className="registerInput-container">
          <label htmlFor="name">First Name</label>
          <input type="text" name="name" id="name" required />
        </div>
        <div className="registerInput-container">
          <label htmlFor="password">Password</label>
          <input
            ref={passwordRef}
            type="password"
            name="password"
            id="password"
            className={
              passwordIsInvalid.errorType === "password too short" ||
              passwordIsInvalid.errorType ===
                "no capital and special characters"
                ? "errorBorder"
                : undefined
            }
            required
          />
          {passwordIsInvalid.errorType === "password too short" ? (
            <p className="errorMessage">
              The password should be at least 6 characters.
            </p>
          ) : passwordIsInvalid.errorType ===
            "no capital and special characters" ? (
            <p>
              <p className="errorMessage">
                The password should contain one special and one capital
                character.
              </p>
            </p>
          ) : (
            ""
          )}
        </div>
        <div className="registerInput-container">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            ref={confirmPasswordRef}
            className={
              passwordIsInvalid.errorType === "passwords does not match"
                ? "errorBorder"
                : undefined
            }
            required
          />
          {passwordIsInvalid.errorType === "passwords does not match" && (
            <p className="errorMessage">
              The password you entered does not match the password above.
            </p>
          )}
        </div>
        <button className="submitForm-button" disabled={loading || isLoading}>
          {loading || isLoading ? "Loading..." : "Create Account"}
        </button>
        <span className="formSeprator">or</span>
        <button
          type="button"
          className="thirdParty-button"
          onClick={handleGoogleSignup}
        >
          <img src="/google-icon-logo-svgrepo-com.svg" />
          Continue with Google
        </button>
        <button
          type="button"
          className="thirdParty-button"
          onClick={handleFacebookSignup}
        >
          <img src="/facebook-icon-logo-svgrepo-com.svg" />
          Continue with Facebook
        </button>
        <p className="accountLogin-text">
          Have an account already? <Link to={"/login"}>Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;

export const loader = () => {
  const isAuth = localStorage.getItem("isAuth");
  const userEmail = localStorage.getItem("userEmail");

  if (isAuth === "true") {
    return redirect("/");
  }

  return null;
};
