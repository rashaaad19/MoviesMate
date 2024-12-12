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
import MyProfile from "./pages/MyProfile";
import EditProfile from "./pages/EditProfile";
import MovieProfile from "./pages/MovieProfile";
import Favourites from "./pages/Favourites";
import Watched from "./pages/Watched";
import Reviews from "./pages/Reviewes";

import { loader as movieDataLoader } from "./pages/MovieProfile";
import { loader as loginLoader } from "./pages/Login";
import { loader as signupLoader } from "./pages/Signup";
import { loader as myProfileLoader } from "./pages/MyProfile";

function App() {
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
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "login",
          element: <Login />,
          loader: loginLoader,
        },
        {
          path: "signup",
          element: <Signup />,
          loader: signupLoader,
        },

        {
          path: "user/:userID",
          element: <MyProfile />,
          loader: myProfileLoader,
        },
        {
          path: "/:userID/favourites",
          element: <Favourites />,
        },
        { path: "/:userID/watched", element: <Watched /> },
        {
          path: "/:userID/reviews",
          element: <Reviews />,
        },
        {
          path: "user/:userID/edit",
          element: <EditProfile />,
          loader: myProfileLoader, //using same profile data
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
  // useEffect(() => {
  //   if (showMenu) {
  //     document.body.classList.add("overflow-hidden");
  //   } else {
  //     document.body.classList.remove("overflow-hidden");
  //   }
  // }, [showMenu]);

  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
