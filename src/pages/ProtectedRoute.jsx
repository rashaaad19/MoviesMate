import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ type }) => {
  const [isAuth, setIsAuth] = useState(null);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // `!!user` converts the user object to `true` or `false`
      setIsAuth(!!user);
    });
  }, []);

  // Show a loading indicator while checking authentication status
  if (isAuth === null) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {type === "kickNonAuthUser" && !isAuth ? (
        <Navigate to="/" />
      ) : type === "kickAuthUser" && isAuth ? (
        <Navigate to={"/"} />
      ) : (
        <Outlet />
      )}
    </>
  ); // Allow access if no conditions are triggered
};

export default ProtectedRoute;
