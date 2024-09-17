import { useLoaderData } from "react-router-dom";
import MovieProfileHero from "../UI/MovieProfileHero";

const MovieProfile = () => {
  const data = useLoaderData();
  const movieInformation = data.movieData;
  const imdbInformation = data.imdbData;
  const castData = movieInformation.credits.cast;
  const crewData = movieInformation.credits.crew;

  console.log(movieInformation)

  return (
    <>
      <MovieProfileHero
        title={movieInformation.title}
        backdrop={movieInformation.backdrop_path}
        genres={movieInformation.genres}
        id={movieInformation.id}
        overview={movieInformation.overview}
        imdbId={movieInformation.imdbID}
        imdbRate={imdbInformation.imdbRating}
        poster={movieInformation.poster_path}
        releaseDate={movieInformation.release_date}
        runtime={movieInformation.runtime}
        cast={castData}
        crew={crewData}
      />
    </>
  );
};

export default MovieProfile;

export const loader = async ({ params }) => {
  const id = params.movieID;

  const movieDataURL = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits,reviews`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBmYTdlYzVlNmRiNjY0MzcxOGU1MzVjNTIzNGI5NSIsIm5iZiI6MTcyMjAyNjAzMi4xMDA3NTQsInN1YiI6IjY1YTE0MTdkYjM0NDA5MDEyZDY3MmM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49wnmbLJtgXWIFLx3Npd9hUk4xPIM5vuUrzbwaTdMr0",
    },
  };

  const movieResponse = await fetch(movieDataURL, options);
  if (!movieResponse.ok) {
    throw new Error(movieResponse.statusText);
  }
  const movieData = await movieResponse.json();

  const movieIMDbId = movieData.imdb_id;
  const imdbDataURL = `https://www.omdbapi.com/?i=${movieIMDbId}&plot=short&r=json&apikey=ee6d6c20`;

  const imdbResponse = await fetch(imdbDataURL);
  const imdbData = await imdbResponse.json();

  return { movieData, imdbData };
};
