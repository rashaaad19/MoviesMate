//components
import CategorySlider from "../components/CategorySlider";
import MainWallpaper from "../components/MainWallpaper";
import MovieSlider from "../components/MovieSlider";
import FeaturedMovieCard from "../UI/FeaturedMovieCard";

import { options } from "../data/tmdb";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { userNameGenerator } from "./../utilties/functions";

const popularURL =
  "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=100";
const topRatedURL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en&page=1";
const nowPlayingURL =
  "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=c20fa7ec5e6db6643718e535c5234b95&region=us";

const Home = () => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;
      // console.log(user);
      // ...
    } else {
      // User is signed out
      // ...
    }
  });

  return (
    <>
      <MainWallpaper />
      <MovieSlider
        sliderHeader="New Releases"
        url={nowPlayingURL}
        options={options}
        type="regular"
      />
      <MovieSlider
        sliderHeader="Top Rated"
        url={topRatedURL}
        options={options}
        type="regular"
      />

      <CategorySlider />
      <MovieSlider
        sliderHeader="Trending"
        url={popularURL}
        options={options}
        type="trending"
      />
      <FeaturedMovieCard />
    </>
  );
};

export default Home;
