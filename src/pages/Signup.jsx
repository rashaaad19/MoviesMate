import { Link } from "react-router-dom";
import "./SignUp.scss";

import { useRef, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  FacebookAuthProvider,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../firebase";
import { validatePassword } from "../utilties/functions";

const Signup = () => {
  const [passwordIsInvalid, setPasswordIsInvalid] = useState({
    invalid: false,
    errorType: "",
  });

  // reference to manipulate input element
  const confirmPasswordRef = useRef(null);
  const passwordRef = useRef(null);

  // assigning third party register providers
  const googleProvider = new GoogleAuthProvider();
  const facebookProvider = new FacebookAuthProvider();

  const handleOnSubmit = (event) => {
    event.preventDefault();
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
    console.log(validatePassword(userData.userPassword));

    //password validation

    if (password !== confirmPasword) {
      setPasswordIsInvalid({
        invalid: true,
        errorType: "passwords does not match",
      });
      confirmPasswordRef.current.focus();
    } else if (userData.userPassword.length < 6) {
      setPasswordIsInvalid({ invalid: true, errorType: "password too short" });
      passwordRef.current.focus();
    } else if (validatePassword(userData.userPassword) !== true) {
      setPasswordIsInvalid({
        invalid: true,
        errorType: "no capital and special characters",
      });
      passwordRef.current.focus();
    } else {
      setPasswordIsInvalid({ invalid: false, errorType: "" });

      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up
          const user = userCredential.user;
          console.log(userCredential);

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // ..
        });
    }
  };

  const handleGoogleSignup = () => {
    console.log("google");

    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        console.log(user);
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(error);
        // ...
      });
  };

  const handleFacebookSignup = () => {
    console.log("facebook");
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log(user);

        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;

        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);

        // ...
      });
  };

  return (
    <div className="registerForm-container">
      <form className="registerForm" onSubmit={handleOnSubmit}>
        <h1>Let&apos;s get started.</h1>
        <p className="registerInput-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
        </p>
        <p className="registerInput-container">
          <label htmlFor="name">First Name</label>
          <input type="text" name="name" id="name" required />
        </p>
        <p className="registerInput-container">
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
        </p>
        <p className="registerInput-container">
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
        </p>
        <button className="submitForm-button">Create Account</button>
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
