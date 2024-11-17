import "./DiscoverMovieList.scss";
import useFetch from "../hooks/useFetch";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";

const DiscoverMovieList = () => {
  const [params, setParams] = useState({
    api_key: "c20fa7ec5e6db6643718e535c5234b95",
    include_adult: false,
    include_video: false,
    page: 1,
  });
  // const moviesURL = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=primary_release_date.desc`;

  const sortByState = useSelector((state) => state.discover.sortBy);
  const yearState = useSelector((state) => state.discover.year);
  const languageState = useSelector((state) => state.discover.language);
  const genreState = useSelector((state) => state.discover.genre);

  //processing the dates format to match the API
  const queryString = new URLSearchParams(params).toString();

  let moviesURL = `https://api.themoviedb.org/3/discover/movie?${queryString}`;


  useEffect(() => {
    const updateParams = () => {
      const updatedParams = { ...params }; // Start with the current params
  
      if (languageState !== "all") {
        updatedParams.with_original_language = languageState;
      } else {
        delete updatedParams.with_original_language;
      }
  
      if (genreState !== "all") {
        updatedParams.with_genres = genreState;
      } else {
        delete updatedParams.with_genres;
      }
  
      updatedParams.sort_by = sortByState;
  
      if (yearState !== "all") {
        updatedParams["release_date.gte"] = yearState.gte;
        updatedParams["release_date.lte"] = yearState.lte;
      } else {
        delete updatedParams["release_date.gte"];
        delete updatedParams["release_date.lte"];
      }
  
      return updatedParams;
    };
  
    setParams(updateParams());
  }, [languageState, genreState, yearState, sortByState]);
  console.log(queryString);
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
  // data && data.results.map((item) => console.log(item.title));

  return <div>DiscoverMovieList</div>;
};

export default DiscoverMovieList;
