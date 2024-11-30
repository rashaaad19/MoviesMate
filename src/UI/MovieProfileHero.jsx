import "./MovieProfileHero.scss";
import { useEffect, useState } from "react";

import { releaseDateFormatter, runtimeFormatter } from "../utilties/functions";

import { Rating } from "react-simple-star-rating";
import { TbEyeCheck, TbHeartPlus } from "react-icons/tb";
import TooltipIcon from "./TooltipIcon";
import { updateDoc } from "firebase/firestore";

//TODO: link watched and favs to user's firestore doc.

const MovieProfileHero = ({
  crew,
  title,
  runtime,
  genres,
  overview,
  releaseDate,
  poster,
  backdrop,
  id,
  imdbID,
  imdbRate,
}) => {
  const [ratingValue, setRatingValue] = useState(0);
  const [isWatched, setIsWatched] = useState(false);
  const [isFav, setIsFav] = useState(false);

  const isAuth = localStorage.getItem("isAuth");
  const directors = crew.filter(({ job }) => job === "Director");
  const writers = crew.filter(
    ({ job }) => job === "Screenplay" || job === "Writer"
  );
  const formatedRuntime = runtimeFormatter(runtime);
  const releaseYear = releaseDateFormatter(releaseDate);

  const handleRating = (rate) => {
    setRatingValue(rate);
  };

  const handleWatchedClick = () => {
    setIsWatched(!isWatched);
  };
  const handleFavClick = () => {
    setIsFav(!isFav);
  };

  // useEffect( async() => {
  //     updateDoc
  // }, []);

  return (
    <div
      className="movieHero-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
      }}
    >
      <img src={`https://image.tmdb.org/t/p/w342${poster}`} />

      <div className="movieHero-infoContainer">
        <h1>{title}</h1>

        <p>
          <span>{releaseYear + " "}</span>
          <span>{formatedRuntime + "  "}</span>
        </p>

        <p>
          {genres.map((item, index) => (
            <span key={item.id}>
              {item.name}
              {genres.length !== 1 && index !== genres.length - 1 ? " | " : ""}
            </span>
          ))}
        </p>

        <div className="movieRating-container">
          <a
            className="imdbInfo"
            href={`https://www.imdb.com/title/${imdbID}`}
            target="_blank"
          >
            <img className="imdbLogo" src="/IMDB_Logo_2016.svg" />
            <span>{imdbRate}</span>
          </a>
          {isAuth && (
            <TooltipIcon
              icon={
                <TbEyeCheck
                  size={"1.5em"}
                  className={
                    isWatched ? "active-tooltipIcon" : "nonActive-tooltipIcon"
                  }
                  onClick={handleWatchedClick}
                />
              }
              tooltip={isWatched ? "Remove from watched" : "Add to watched"}
            />
          )}
          {isAuth && (
            <TooltipIcon
              icon={
                <TbHeartPlus
                  size={"1.5em"}
                  className={
                    isFav ? "active-tooltipIcon" : "nonActive-tooltipIcon"
                  }
                  onClick={handleFavClick}
                />
              }
              tooltip={isFav ? "Remove from favourites" : "Add to favourites"}
            />
          )}

          <Rating
            readonly={isAuth === "true" ? false : true}
            disableFillHover={false}
            onClick={handleRating}
            size={25}
          />
        </div>
        <p>{overview}</p>

        {/* mapping through each elemnt in the director and writers array
    and formating it to increase redability 
  */}

        <p>
          Directed by:
          {directors.map((director, index) => (
            <span key={director.id}>
              {" " + director.name}{" "}
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
              {" " + writer.name}{" "}
              {writers.length !== 1 && index !== writers.length - 1 ? ", " : ""}
            </span>
          ))}
        </p>
      </div>
    </div>
  );
};

export default MovieProfileHero;
