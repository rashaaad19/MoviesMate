import { useLoaderData } from "react-router-dom";
import MovieList from "../UI/MovieList";

const Watched = () => {
  const data=useLoaderData();
  const userWatched = data.movies.watched;
  console.log(userWatched)

  return (
    <>
    <MovieList movies={userWatched} type={'watched'}/>
    </>
  );
};

export default Watched;





