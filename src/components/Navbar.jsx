import { NavLink } from "react-router-dom";
import "./Navbar.scss";

const Navbar = () => {
  return (
    <nav className="navContainer">
      <ul className="navList">
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
                className={({ isActive }) => (isActive ? `active` : undefined)}
                to=""
              >
                Home
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                className={({ isActive }) => (isActive ? `active` : undefined)}
                to="my-movies"
              >
                My Movies
              </NavLink>
            </li>
            <li className="navItem">
              <NavLink
                className={({ isActive }) => (isActive ? `active` : undefined)}
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
    </nav>
  );
};

export default Navbar;
