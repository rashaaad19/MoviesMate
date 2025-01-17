import { useLoaderData } from "react-router-dom";
import MovieList from "../UI/MovieList";

const Reviews = () => {
  const data = useLoaderData();
  const userData=data.movies.reviews||[]
  console.log(data)
  return (
    <>
    <MovieList movies={userData} type={'reviewed'}/>
    </>
  );
};

export default Reviews;
