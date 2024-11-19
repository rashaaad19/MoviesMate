import "./DiscoverMovieList.scss";
import useFetch from "../hooks/useFetch";
import { genreOptions } from "../data/filterOptions";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";

const DiscoverMovieList = () => {
  //Extracting the states from the discover slice
  const sortByState = useSelector((state) => state.discover.sortBy);
  const yearState = useSelector((state) => state.discover.year);
  const languageState = useSelector((state) => state.discover.language);
  const genreState = useSelector((state) => state.discover.genre);
  const pageState = useSelector((state) => state.discover.page);
  console.log(pageState);

  //URL params state
  const [params, setParams] = useState({
    api_key: "c20fa7ec5e6db6643718e535c5234b95",
    include_adult: false,
    include_video: false,
    page: pageState,
    "vote_count.gte": 100,
  });
  console.log(params);

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
  );

  //find genreID by name
  const findGenreID = (name) => {
    const genre = genreOptions.find(
      (genre) => genre.name.toLowerCase() === name.toLowerCase()
    );
    return genre ? genre.id : null;
  };
  const genreID = findGenreID(genreState);

  const queryString = new URLSearchParams(params).toString();
  let moviesURL = `https://api.themoviedb.org/3/discover/movie?${queryString}`;

  //dynamically changing the parameters based on the global state.
  useEffect(() => {
    const updateParams = () => {
      const updatedParams = { ...params, page: pageState }; // Start with the current params

      if (languageState !== "all") {
        updatedParams.with_original_language = languageState;
        //remove the query if the user selected "all" option
      } else {
        delete updatedParams.with_original_language;
      }

      if (genreState !== "all") {
        updatedParams.with_genres = genreID;
      } else {
        delete updatedParams.with_genres;
      }

      updatedParams.sort_by = sortByState;

      if (yearState !== "all") {
        updatedParams["primary_release_date.gte"] = yearState.gte;
        updatedParams["primary_release_date.lte"] = yearState.lte;
      } else {
        delete updatedParams["primary_release_date.gte"];
        delete updatedParams["primary_release_date.lte"];
      }

      return updatedParams;
    };
    setParams(updateParams());
  }, [languageState, genreState, yearState, sortByState, pageState, genreID]);

  //fetching the data using custom hook
  const { data, loading, error } = useFetch(moviesURL, options);

  console.log(moviesURL);

  return (
    <>
      <div className="discoverMovieList-container">
        {data &&
          data.results.map((movie) => {
            return (
              <div key={movie.id} className="movieCard">
                <Link to={`/movies/${movie.id}`} className="posterLink">
                  <img
                    src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                    key={movie.title}
                    loading="lazy"
                  />
                </Link>
                <Link to={`/movies/${movie.id}`} className="titleLink">
                  <h3>{movie.title}</h3>
                </Link>
              </div>
            );
          })}
      </div>
      {data && <Pagination totalResults={data.total_results} />}
    </>
  );
};

export default DiscoverMovieList;
