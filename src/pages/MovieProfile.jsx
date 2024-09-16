import { useLoaderData } from "react-router-dom";
import MovieProfileMain from "../UI/MovieProfileMain";

const MovieProfile = () => {
  const data = useLoaderData();
  const movieData = data.movieData;
  const castData= data.movieData.credits.cast;
  const crewData=data.movieData.credits.crew;
  console.log(movieData);
  return (
    <>
      <MovieProfileMain
        title={movieData.title}
        backdrop={movieData.backdrop_path}
        genres= {movieData.genres}
        id={movieData.id}
        overview={movieData.overview}
        imdbID={movieData.imdbID}
        poster={movieData.poster_path}
        releaseDate={movieData.releaseDate}
        runtime={movieData.runtime}
        cast={castData}
        crew={crewData}

      />
    </>
  );
};

export default MovieProfile;

export const loader = async ({ params }) => {
  const id = params.movieID;

  const movieDataURL = `https://api.themoviedb.org/3/movie/${id}?language=en-US&append_to_response=credits`;
  const reviewsURL = `https://api.themoviedb.org/3/movie/${id}/reviews?language=en-US&page=1`;
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

  const reviewsResponse = await fetch(reviewsURL, options);
  if (!reviewsResponse.ok) {
    throw new Error(reviewsResponse.statusText);
  }
  const reviewData = await reviewsResponse.json();

  return { movieData, reviewData };
};
