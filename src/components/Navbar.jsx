import { NavLink, useNavigate } from "react-router-dom";

import "./Navbar.scss";

import { useEffect, useState } from "react";

import { useDispatch } from "react-redux";
import { UiActions } from "../store/UiSlice";
import { auth } from "../firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { userDataActions } from "../store/UserDataSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  //listen to changes in user state to update th UI
  useEffect(() => {
    //firebase returns cleaner function to detach listener when not needed
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
        dispatch(
          userDataActions.updateUserCredentials({
            email: user.email,
            name: user.displayName,
          })
        );
        // ...
      } else {
        // User is signed out
        setCurrentUser(null);
        // ...
      }
    });
    return () => unsubscribe();
  }, []);

  console.log(currentUser);
  const burgerButtonHandler = () => {
    setShowMenu(!showMenu);
    dispatch(UiActions.toggleNav());
  };

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        //Sign-out successful.
        console.log("user signed out");
        setCurrentUser(null);
        navigate('/')
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
              <p>MoviesMate</p>
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
            {currentUser ? (
              <ul className="navSubList">
                <li className="navItem ">
                  <button onClick={handleSignOut}>Sign out</button>
                </li>
                <li className="navItem ">
                  <NavLink
                    className={({ isActive }) =>
                      isActive ? `active signup-button` : `signup-button`
                    }
                    to="/myprofile"
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
