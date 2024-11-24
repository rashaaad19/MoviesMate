import { Link, redirect, useNavigate } from "react-router-dom";

import "./Register.scss";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

const Login = () => {
  const [loginError, setLoginError] = useState({
    errorStatus: false,
    type: "",
  });
  const navigate = useNavigate();
  const { handleFacebookSignup, handleGoogleSignup } = useAuth();
  //handling normal login submission
  const handleOnSubmit = (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    const userEmail = userData.get("email");
    const userPassword = userData.get("password");

    signInWithEmailAndPassword(auth, userEmail, userPassword)
      .then((userCredential) => {
        // Signed in
        console.log(userCredential.user);
        setLoginError({ errorStatus: false, type: "" });
        // Persist authentication data
        localStorage.setItem("isAuth", "true");
        localStorage.setItem("userEmail", userEmail);
        localStorage.setItem("userID", userCredential.user.uid);

        navigate("/");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(error.code);
        if (errorCode === "auth/invalid-credential") {
          setLoginError({ errorStatus: true, type: "wrong credentials" });
        }
      });
  };

  return (
    <div className="registerForm-container">
      <form onSubmit={handleOnSubmit} className="registerForm">
        <h1>Welcome Back!</h1>
        <div className="registerInput-container">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" id="email" required />
          {loginError.type === "wrong credentials" && (
            <p className="errorMessage">
              The email or password entered is incorrect
            </p>
          )}
        </div>
        <div className="registerInput-container">
          <label htmlFor="password">Password</label>
          <input type="password" name="password" id="password" required />
        </div>
        <button className="submitForm-button">Login</button>
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
          Does not have account? <Link to={"/signup"}>Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;

export const loader = () => {
  const isAuth = localStorage.getItem("isAuth"); //extracting auth status from local storage
  if (isAuth === "true") {
    return redirect("/");
  }

  return null;
};
