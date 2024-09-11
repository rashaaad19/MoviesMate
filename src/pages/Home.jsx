//components
import CategorySlider from "../components/CategorySlider";
import MainWallpaper from "../components/MainWallpaper";
import MovieSlider from "../components/MovieSlider";
import FeaturedMovieCard from "../UI/FeaturedMovieCard";

const popularURL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const topRatedURL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en&page=1";
  const nowPlayingURL='https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1&api_key=c20fa7ec5e6db6643718e535c5234b95&region=us'
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBmYTdlYzVlNmRiNjY0MzcxOGU1MzVjNTIzNGI5NSIsIm5iZiI6MTcyMjAyNjAzMi4xMDA3NTQsInN1YiI6IjY1YTE0MTdkYjM0NDA5MDEyZDY3MmM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49wnmbLJtgXWIFLx3Npd9hUk4xPIM5vuUrzbwaTdMr0",
  },
};



const Home = () => {
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
    
      <CategorySlider
      />
      <MovieSlider  sliderHeader="Trending"
        url={popularURL}
        options={options}
        type="trending"/>
        <FeaturedMovieCard/>
    </>
  );
};

export default Home;
