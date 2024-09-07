import { NavLink } from "react-router-dom";
import "./Navbar.scss";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { UiActions } from "../store/UiSlice";

const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const dispatch = useDispatch()
  const burgerButtonHandler = () => {
    setShowMenu(!showMenu);
    dispatch(UiActions.toggleNav())
  };

  console.log(showMenu);
  return (
    <>
      <nav
        className={showMenu ? `fullPageContainer` : `navContainer`}
        style={showMenu ? { height: "100vh" } : {height:'4rem'}}
      >
        <ul className="navList">
          {/* Burger button for small screens  */}
          <li className="navItem burger-button">
            <img
              onClick={burgerButtonHandler}
              src="/public/burger-menu-svgrepo-com.svg"
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
                  to="my-movies"
                >
                  My Movies
                </NavLink>
              </li>
              <li className="navItem">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active` : undefined
                  }
                  to="discover"
                >
                  Discover
                </NavLink>
              </li>
            </ul>
          </li>
          <li className="navSection">
            <ul className="navSubList">
              <li className="navItem ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active login-button` : "login-button"
                  }
                  to="login"
                >
                  Log In
                </NavLink>
              </li>
              <li className="navItem ">
                <NavLink
                  className={({ isActive }) =>
                    isActive ? `active signup-button` : `signup-button`
                  }
                  to="signup"
                >
                  Sign Up
                </NavLink>
              </li>
            </ul>
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
