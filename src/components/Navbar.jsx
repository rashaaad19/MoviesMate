import "./Navbar.scss";

import UserMenu from "../UI/UserMenu";

import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import useCheckMobileScreen from "../hooks/useCheckMobileScreen";

import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { userDataActions } from "../store/UserDataSlice";
import { doc, getDoc } from "firebase/firestore";

import { IoIosArrowDown } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [userData, setUserData] = useState({});
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showSideBar, setShowSideBar] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const mobileScreen = useCheckMobileScreen();

  const authStatus = localStorage.getItem("isAuth"); //extract authentication status to update UI
  let docRef;
  let userID;

  if (authStatus === "true") {
    userID = localStorage.getItem("userID"); //extract user id
    docRef = doc(db, "users", userID);
  }

  //todo: enhance the sidebar design and fix the error of moving to desktop screen without pressing buttons.
  //todo: --->  useCheckMobileScreen hook

  useEffect(() => {
    const fetchUserImage = async () => {
      if (authStatus === "true") {
        try {
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.log("Error fetching document:", error);
        }
      }
    };
    fetchUserImage();
  }, [authStatus]);

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
        setShowUserMenu(false);
        setUserData({});
        navigate("/login");
      })
      .catch((error) => {
        //an error happened
        console.log(error);
      });
    setShowSideBar(false);
  };

  const handleUserMenu = () => {
    setShowUserMenu(!showUserMenu);
  };

  const handleSideBar = () => {
    setShowSideBar(!showSideBar);
  };

  //automatically changing sidebar and menubar visibility based on screen size.
  useEffect(() => {
    !mobileScreen && setShowSideBar(false);
    mobileScreen && setShowUserMenu(false);
  }, [mobileScreen]);

  return (
    <>
      <nav>
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
          <p className="navbarLogo">MoviesMate</p>
        </NavLink>
        <GiHamburgerMenu
          onClick={handleSideBar}
          className="open-sidebar-button"
        />
        {showSideBar && <label id="overlay" onClick={handleSideBar} />}
        {/* overlay element to close the sidemenu*/}
        <div
          className={
            showSideBar
              ? "sidebarLinks-container sidebar-isActive"
              : "sidebarLinks-container"
          }
        >
          <IoMdClose className="close-sidebar-button" onClick={handleSideBar} />

          {authStatus === "true" && userData && (
            <div className="sidebar-userData">
              <img src={userData.image} />
              <h3>{userData.name}</h3>
              <p>{userData.userName}</p>
            </div>
          )}

          <NavLink
            className={({ isActive }) => (isActive ? `active` : undefined)}
            to=""
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            Home
          </NavLink>
          {mobileScreen && (
            <NavLink
              className={({ isActive }) => (isActive ? `active` : undefined)}
              to={`/${userID}/reviews`}
              onClick={() => {
                setShowSideBar(false);
              }}
            >
              Reviews
            </NavLink>
          )}
          {mobileScreen && (
            <NavLink
              className={({ isActive }) => (isActive ? `active` : undefined)}
              to={`/${userID}/favourites`}
              onClick={() => {
                setShowSideBar(false);
              }}
            >
              Favourites
            </NavLink>
          )}
          {mobileScreen && (
            <NavLink
              className={({ isActive }) => (isActive ? `active` : undefined)}
              to={`/${userID}/watched`}
              onClick={() => {
                setShowSideBar(false);
              }}
            >
              Watched
            </NavLink>
          )}
          <NavLink
            className={({ isActive }) => (isActive ? `active` : undefined)}
            to="/discover"
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            Discover
          </NavLink>
          <NavLink
            className={({ isActive }) => (isActive ? `active` : undefined)}
            to={`/user/${userID}`}
            onClick={() => {
              setShowSideBar(false);
            }}
          >
            My Profile
          </NavLink>
          {/*move this section to the to of the sidebar*/}
          {authStatus === "true" ? (
            <button className={"user-navMenu"} onClick={handleUserMenu}>
              {userData.image && <img src={userData.image} alt="profile" />}
              <IoIosArrowDown
                className={showUserMenu ? "activeArrow" : "nonActiveArrow"}
              />
            </button>
          ) : (
            <>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `active login-button` : "login-button"
                }
                onClick={() => {
                  setShowSideBar(false);
                }}
                to="/login"
              >
                Log In
              </NavLink>
              <NavLink
                className={({ isActive }) =>
                  isActive ? `active signup-button` : `signup-button`
                }
                to="/signup"
                onClick={() => {
                  setShowSideBar(false);
                }}
              >
                Sign Up
              </NavLink>
            </>
          )}
          {mobileScreen && authStatus === "true" && (
            <>
              <button className="sidebar-logout" onClick={handleSignOut}>
                Log out
              </button>
            </>
          )}
        </div>
      </nav>

      {!showSideBar && showUserMenu && userData && (
        <UserMenu
          name={userData.name}
          image={userData.image}
          userName={userData.userName}
          userID={userID}
          onSignout={handleSignOut}
          isActive={showUserMenu}
          removeMenu={() => setShowUserMenu(false)}
        />
      )}
    </>
  );
};

export default Navbar;
