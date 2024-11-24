//Styles
import "./App.scss";

//libraries
import { createBrowserRouter, RouterProvider } from "react-router-dom";

//components
import Root from "./components/Root";
import MyMovies from "./pages/MyMovies";
import About from "./pages/About";
import Discover from "./pages/Discover";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import MovieProfile from "./pages/MovieProfile";

import { loader as movieDataLoader } from "./pages/MovieProfile";
import { loader as loginLoader } from "./pages/Login";
import { loader as signupLoader } from "./pages/Signup";
import { loader as myProfileLoader } from "./pages/MyProfile";

import MyProfile from "./pages/MyProfile";
import ProtectedRoute from "./pages/ProtectedRoute";

function App() {
  const showMenu = useSelector((state) => state.Ui.fullPageNav);
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "",
          element: <Home />,
        },
        {
          path: "my-movies",
          element: <MyMovies />,
        },
        {
          path: "discover",
          element: <Discover />,
          // loader: moviesListLoader,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "login",
          element: <ProtectedRoute type="kickAuthUser" />,
          children: [
            {
              index: true,
              element: <Login />,
              loader: loginLoader,
            },
          ],
        },
        {
          path: "signup",
          element: <ProtectedRoute type="kickAuthUser" />,
          children: [
            {
              index: true,
              element: <Signup />,
              loader: signupLoader,
            },
          ],
        },

        {
          path: "myprofile",
          element: <ProtectedRoute type="kickNonAuthUser" />,
          children: [
            {
              index: true,
              element: <MyProfile />,
              loader: myProfileLoader,
            },
          ],
        },
        {
          path: "movies/:movieID",
          element: <MovieProfile />,
          loader: movieDataLoader,
        },
      ],
    },
  ]);

  // Add/remove class to body based on menuOpen state
  useEffect(() => {
    if (showMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [showMenu]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
