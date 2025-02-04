import { Link } from "react-router-dom";
import "./MainWallpaper.scss";
import useFetch from "../hooks/useFetch";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBmYTdlYzVlNmRiNjY0MzcxOGU1MzVjNTIzNGI5NSIsIm5iZiI6MTcyMjAyNjAzMi4xMDA3NTQsInN1YiI6IjY1YTE0MTdkYjM0NDA5MDEyZDY3MmM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49wnmbLJtgXWIFLx3Npd9hUk4xPIM5vuUrzbwaTdMr0",
  },
};
const url =
  "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1";

const MainWallpaper = ({ authStatus }) => {
  const { data, loading, error } = useFetch(url, options);

  return (
    <div className="container">
      <div className="black-fallout"></div>
      <div className="image-description">
        <h1>The Best Movie Library</h1>
        <p>
          Welcome to MoviesMate, your ultimate destination for discovering and
          exploring the finest movies from around the world. Whether you&apos;re
          a fan of timeless classics, the latest blockbusters, or hidden gems,
          MoviesMate offers a curated collection to satisfy your cinematic
          cravings. Dive into our extensive library, where you can find detailed
          information, ratings, and reviews on all your favorite films.
          Experience the magic of movies like never before with MoviesMate –
          your trusted companion for every movie night.
        </p>
        {authStatus === "false" && <Link to="/signup">Join Now</Link>}
      </div>
    </div>
  );
};

export default MainWallpaper;
