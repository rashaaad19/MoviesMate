import "./DiscoverMovieList.scss";
import useFetch from "../hooks/useFetch";
import { useMemo } from "react";
import { useSelector } from "react-redux";

const DiscoverMovieList = () => {
  const moviesURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc`;

  
  // Memoize the options object to avoid changing reference on each render
  const options = useMemo(
    () => ({
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBmYTdlYzVlNmRiNjY0MzcxOGU1MzVjNTIzNGI5NSIsIm5iZiI6MTcyMjAyNjAzMi4xMDA3NTQsInN1YiI6IjY1YTE0MTdkYjM0NDA5MDEyZDY3MmM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49wnmbLJtgXWIFLx3Npd9hUk4xPIM5vuUrzbwaTdMr0",
      },
    }),
    []
  ); // Empty dependency array ensures the options object is memoized only once

  const { data, loading, error } = useFetch(moviesURL, options);
  //   data && data.results.map((item) => console.log(item.title));

  const state = useSelector((state) => state.discover.sortBy);
console.log(state);
  return <div>DiscoverMovieList</div>;
};

export default DiscoverMovieList;
