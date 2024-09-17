import { Rating } from "react-simple-star-rating";
import { releaseDateFormatter, runtimeFormatter } from "../utilties/functions";
import "./MovieProfileHero.scss";
import { useState } from "react";

const MovieProfileHero = ({
  cast,
  crew,
  title,
  runtime,
  genres,
  overview,
  releaseDate,
  poster,
  backdrop,
  id,
  imdbId,
  imdbRate,
}) => {
  const [ratingValue, setRatingValue] = useState(0);

  const directors = crew.filter(({ job }) => job === "Director");
  const writers = crew.filter(({ job }) => job === "Screenplay" || job === "Writer");
  const formatedRuntime = runtimeFormatter(runtime);
  const releaseYear = releaseDateFormatter(releaseDate);
console.log(writers)
  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  return (
    <div
      className="movieHero-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w342${poster}`} />
      <h1>{title}</h1>
      <p>
        <span>{releaseYear + " "}</span>
        <span>{formatedRuntime + "  "}</span>
      </p>
      <p>
        {genres.map((item) => (
          <span key={item.id}>{item.name + "  "}</span>
        ))}
      </p>
      <div className="movieRating-container">
        <a className="imdbInfo" href="https://www.imdb.com/">
          <img className="imdbLogo" src="/IMDB_Logo_2016.svg" />
          <span>{imdbRate}</span>
        </a>
        <Rating onClick={handleRating} size={25} />
      </div>
      <p>{overview}</p>

      {/* mapping through each elemnt in the director and writers array
          and formating it to increase redability 
        */}

      <p>
        Directed by:
        {directors.map((director, index) => (
          <span key={director.id}>
            {director.name}{" "}
            {directors.length !== 1 && index !== director.length - 1
              ? ", "
              : ""}
          </span>
        ))}
      </p>
      <p>
        Written by:
        {writers.map((writer, index) => (
          <span key={writer.id}>
            {writer.name} {writers.length !== 1 &&index !== writers.length - 1 ? ", " : ""}
          </span>
        ))}
      </p>
    </div>
  );
};

export default MovieProfileHero;
