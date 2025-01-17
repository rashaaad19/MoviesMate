import "./DiscoverMovieList.scss";
import useFetch from "../hooks/useFetch";
import { genreOptions } from "../data/filterOptions";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Pagination from "../components/Pagination";
import LoadingScreen from "./LoadingScreen";

const DiscoverMovieList = () => {
  // Extracting the states from the discover slice
  const sortByState = useSelector((state) => state.discover.sortBy);
  const yearState = useSelector((state) => state.discover.year);
  const languageState = useSelector((state) => state.discover.language);
  const genreState = useSelector((state) => state.discover.genre);
  const pageState = useSelector((state) => state.discover.page);
  const queryState = useSelector((state) => state.discover.query);

  // URL params state
  const [params, setParams] = useState({
    api_key: "c20fa7ec5e6db6643718e535c5234b95",
    include_adult: false,
    include_video: false,
    page: pageState,
    "vote_count.gte": 100,
    query: queryState, // Include queryState in initial params
  });

  const [currentStart, setCurrentStart] = useState(1);

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

  // Find genreID by name
  const findGenreID = (name) => {
    const genre = genreOptions.find(
      (genre) => genre.name.toLowerCase() === name.toLowerCase()
    );
    return genre ? genre.id : null;
  };
  const genreID = findGenreID(genreState);

  const queryString = new URLSearchParams(params).toString();
  let searchMoviesURL = `https://api.themoviedb.org/3/search/movie?${queryString}`;
  let discoverMoviesURL = `https://api.themoviedb.org/3/discover/movie?${queryString}`;

  // Fetching the data using custom hook
  const {
    data: discoverData,
    loading: discoverLoading,
    error: discoverError,
  } = useFetch(discoverMoviesURL, options);
  const {
    data: searchData,
    loading: searchLoading,
    error: searchError,
  } = useFetch(searchMoviesURL, options);

  // Determine which data to display
  const resultsToDisplay =
    searchData?.results?.length > 0
      ? searchData.results
      : discoverData?.results || [];

  // Dynamically changing the parameters based on the global state
  useEffect(() => {
    const updateParams = () => {
      const updatedParams = { ...params, page: pageState, query: queryState };
      if (languageState !== "all") {
        updatedParams.with_original_language = languageState;
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
  }, [
    languageState,
    genreState,
    yearState,
    sortByState,
    pageState,
    genreID,
    queryState,
  ]);

  if (discoverLoading || searchLoading) {
    return <LoadingScreen />;
  }

  if (resultsToDisplay.length === 0 && !discoverLoading && !searchLoading) {
    return (
      <div style={{ display:'flex', alignItems:'center', flexDirection:'column',paddingBlock:'2rem', gap:'15px' }}>
        <img style={{width:'8rem'}} src="/wrong-svgrepo-com.svg" alt="error" />
        <h1>No Movies Found!</h1>
      </div>
    );
  }

  return (
    <>
      <div className="discoverMovieList-container">
        {resultsToDisplay.map((movie) => (
          <div key={movie.id} className="movieCard">
            <Link to={`/movies/${movie.id}`} className="posterLink">
              <img
                src={`http://image.tmdb.org/t/p/original/${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
              />
            </Link>
            <Link to={`/movies/${movie.id}`} className="titleLink">
              <h3>{movie.title}</h3>
            </Link>
          </div>
        ))}
      </div>
      {resultsToDisplay.length > 0 && (
        <Pagination
          currentStart={currentStart}
          setCurrentStart={setCurrentStart}
          totalResults={
            searchData?.total_results || discoverData?.total_results || 0
          }
        />
      )}
    </>
  );
};

export default DiscoverMovieList;
