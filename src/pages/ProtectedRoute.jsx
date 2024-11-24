import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import {Outlet, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ type }) => {
  const [isAuth, setIsAuth] = useState(null);
  const navigate = useNavigate(); //extracting navigation function
  const authStatus = useSelector((state) => state.userData.isAuth); //extracting auth status from redux slice
  // console.log(authStatus);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     // `!!user` converts the user object to `true` or `false`
  //     if(user){
  //       navigate('/');
  //     }
  //   });
  // }, []);

  // if (type === "kickNonAuthUser" && !isAuth) {
  //   navigate("/");
  // } else if (type === "kickAuthUser" && isAuth) {
  //   navigate("/");
  // }

  // Show a loading indicator while checking authentication status
  // if (isAuth === null) {
  //   return <div>Loading...</div>;
  // }
  // if (authStatus === false && type === "kickNonAuthUser") {
  //   navigate("/");
  // }
  // console.log(authStatus, type === "kickAuthUser");
  // if (authStatus === true && type === "kickAuthUser ") {
  //   navigate("/");
  // }

  return (
    <>
      <Outlet />
      {/* {type === "kickNonAuthUser" && !isAuth ? (
        <Navigate to="/" />
      ) : type === "kickAuthUser" && isAuth ? (
        <Navigate to={"/"} />
      ) : (
        <Outlet />
      )} */}
    </>
  ); // Allow access if no conditions are triggered
};

export default ProtectedRoute;
