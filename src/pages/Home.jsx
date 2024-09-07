//components
import CategorySlider from "../components/CategorySlider";
import MainWallpaper from "../components/MainWallpaper";
import MovieSlider from "../components/MovieSlider";

const newReleasesURL =
  "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const topRatedURL =
  "https://api.themoviedb.org/3/movie/top_rated?language=en&page=1";
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
        url={newReleasesURL}
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
    </>
  );
};

export default Home;
