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
        },
        {
          path: "signup",
          element: <Signup />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
