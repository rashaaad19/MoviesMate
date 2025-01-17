import { Link } from "react-router-dom";
import "./MovieList.scss";

import { Rating } from "react-simple-star-rating";

const MovieList = ({ movies, type }) => {
  console.log(movies);
  return (
    <div className="padding-container">
      {movies.length > 0 ? (
        <div className="movieList-container" data-testid="test-movieList">
          {movies.map((movie) => {
            return (
              <Link
                to={`/movies/${movie.id}`}
                className="movieList-item movieList"
                key={movie.id}
              data-testtid='test-link'
              >
                  <img
                    src={`https://image.tmdb.org/t/p/w185${movie.image}`}
                    alt={movie.name}
                  />
                  <h3>{movie.name} </h3>
                  {type === "reviewed" && (
                    <Rating
                      readonly={true}
                      disableFillHover={false}
                      size={20}
                      allowFraction
                      initialValue={movie.rate}
                    />
                  )}
              </Link>
            );
          })}
        </div>
      ) : (
        <div className="emptyList-error" data-testId="test-error">
          <img
            src="/Empty List.png"
            alt="you don't have movies here"
            className="emptyList-img"
          />
          <span>
            You don&apos;t have {type} movies yet, click to discover more{" "}
          </span>
          <Link to={"/discover"}>Discover </Link>
        </div>
      )}
    </div>
  );
};

export default MovieList;
