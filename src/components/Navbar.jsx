import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.scss";

import { useState } from "react";

import { useDispatch } from "react-redux";
import { UiActions } from "../store/UiSlice";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { userDataActions } from "../store/UserDataSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = localStorage.getItem("isAuth"); //extract authentication status to update UI
  const userID = localStorage.getItem("userID"); //extract user id
  //handle navigation menu changes in mobile screens
  const burgerButtonHandler = () => {
    setShowMenu(!showMenu);
    dispatch(UiActions.toggleNav());
  };

  //handle user signing out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //Sign-out successful.

        //reset userData state
        dispatch(
          userDataActions.updateUserCredentials({ email: "", name: "" })
        );
        //reset local storage;
        localStorage.setItem("isAuth", "false");
        localStorage.removeItem("userEmail");
        localStorage.removeItem("userID");
        navigate("/");
      })
      .catch((error) => {
        //an error happened
        console.log(error);
      });
  };

  return (
    <>
      <nav
        className={showMenu ? `fullPageContainer` : `navContainer`}
        style={showMenu ? { height: "100vh" } : { height: "4rem" }}
      >
        <ul className="navList">
          {/* Burger button for small screens  */}
          <li className="navItem burger-button">
            <img
              onClick={burgerButtonHandler}
              src="/burger-menu-svgrepo-com.svg"
            />
          </li>

          <li className="navItem ">
            <NavLink
              to=""
              //to prevent glitch with the home element below
              className={({ isActive }) => (isActive ? `` : undefined)}
            >
              <img
                className="logo"
                src="/film-svgrepo-com.svg"
                alt="MoviesMate Logo"
              />
              <p style={{cursor:'pointer'}}>MoviesMate</p>
            </NavLink>
          </li>
          <li className="navSection">
            <ul className="navSubList">
              <li className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active` : undefined
                  }
                  to=""
                >
                  Home
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active` : undefined
                  }
                  to="/my-movies"
                >
                  My Movies
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active` : undefined
                  }
                  to="/discover"
                >
                  Discover
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="navSection">
            {authStatus === "true" ? (
              <ul className="navSubList">
                <li className="navItem ">
                  <button onClick={handleSignOut}>Sign out</button>
                </li>
                <li className="navItem ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active signup-button` : `signup-button`
                    }
                    to={`/user/${userID}`}
                  >
                    My Profile
                  </NavLink>
                </li>
              </ul>
            ) : (
              <ul className="navSubList">
                <li className="navItem ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active login-button` : "login-button"
                    }
                    to="/login"
                  >
                    Log In
                  </NavLink>
                </li>
                <li className="navItem ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active signup-button` : `signup-button`
                    }
                    to="/signup"
                  >
                    Sign Up
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
        </ul>
        {showMenu && (
          <ul className="burger-items-container">
            <li className="burger-menu-item">Home</li>
            <li className="burger-menu-item">Home</li>
            <li className="burger-menu-item">Home</li>
            <li className="burger-menu-item">Home</li>
            <li className="burger-menu-item">Home</li>
          </ul>
        )}
      </nav>
    </>
  );
};

export default Navbar;
