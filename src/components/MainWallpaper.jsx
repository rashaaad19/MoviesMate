import { Link } from "react-router-dom";
import "./MainWallpaper.scss";
const MainWallpaper = () => {
  return (
    <div className="container">
      <img className="wallpaper" src="/MoviesMate-main.png" alt="Wallpaper" />
      <div className="black-fallout"></div>
      <div className="image-description">
        <h1>The Best Movie Library</h1>
        <p>
          Welcome to MoviesMate, your ultimate destination for discovering and
          exploring the finest movies from around the world. Whether
          you`&apos;`re a fan of timeless classics, the latest blockbusters, or
          hidden gems, MoviesMate offers a curated collection to satisfy your
          cinematic cravings. Dive into our extensive library, where you can
          find detailed information, ratings, and reviews on all your favorite
          films. Experience the magic of movies like never before with
          MoviesMate – your trusted companion for every movie night.
        </p>
        <Link to='signup'>Join Now</Link>
      </div>
    </div>
  );
};

export default MainWallpaper;
