import "./MovieProfileHero.scss";

import TooltipIcon from "./TooltipIcon";

import { releaseDateFormatter, runtimeFormatter } from "../utilties/functions";

import { Rating } from "react-simple-star-rating";
import { TbEyeCheck, TbHeartPlus } from "react-icons/tb";

import { useState } from "react";

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

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
  userData,
}) => {
  const isAuth = localStorage.getItem("isAuth"); //extract authentication status from local storage
  const userID = localStorage.getItem("userID"); // extract User ID from local storage
console.log(userData)
  let isUserFav;
  let isUserWatched;
  let isUserReviewed;
  let currentReviewValue;
  let userRef; //getting reference to the user doc

  if (userData) {
    isUserFav = userData.movies.favourites.some((movie) => movie.id === id); //check if movie exists in user database
    isUserWatched = userData.movies.watched.some((movie) => movie.id === id);
    isUserReviewed = userData.movies.reviews.some((movie) => movie.id === id);
    currentReviewValue = userData.movies.reviews.find(
      (movie) => movie.id === id
    );
    userRef = doc(db, "users", userID);
  }
  const formatedRuntime = runtimeFormatter(runtime);
  const releaseYear = releaseDateFormatter(releaseDate);
  const directors = crew.filter(({ job }) => job === "Director");
  const writers = crew.filter(
    ({ job }) => job === "Screenplay" || job === "Writer"
  );

  const [currentFav, setCurrentFav] = useState(isUserFav);
  const [currentWatched, setCurrentWatched] = useState(isUserWatched);
  const [currentRate, setCurrentRate] = useState(
    currentReviewValue ? currentReviewValue.rate : 0
  );

  const handleRating = async (rate) => {
    if (!isUserReviewed) {
      await updateDoc(userRef, {
        "movies.reviews": arrayUnion({
          name: title,
          image: poster,
          rate: rate,
          id: id,
        }),
      });
      // updating local state to keep all changes synced with firestore
      currentReviewValue = {
        name: title,
        image: poster,
        rate: rate,
        id: id,
      };
      setCurrentRate(rate);
    }

    if (isUserReviewed) {

      await updateDoc(userRef, {
        "movies.reviews": arrayRemove({
          name: title,
          image: poster,
          rate: currentRate,
          id: id,
        }),
      });

      await updateDoc(userRef, {
        "movies.reviews": arrayUnion({
          name: title,
          image: poster,
          rate: rate,
          id: id,
        }),
      });
      // updating local state to keep all changes synced with firestore
      currentReviewValue = {
        name: title,
        image: poster,
        rate: rate,
        id: id,
      };
      setCurrentRate(rate);
    }
  };

  const handleWatchedClick = async () => {
    //if the movie is not watched in the user's database, add it on click.
    if (!currentWatched) {
      setCurrentWatched(true);
      await updateDoc(userRef, {
        "movies.watched": arrayUnion({ name: title, image: poster, id: id }),
      });
    }
    //if the movie is watched in the user's database, remove it on click.
    if (currentWatched) {
      setCurrentWatched(false);
      await updateDoc(userRef, {
        "movies.watched": arrayRemove({ name: title, image: poster, id: id }),
      });
    }
  };

  const handleFavClick = async () => {
    if (!currentFav) {
      setCurrentFav(true);
      await updateDoc(userRef, {
        "movies.favourites": arrayUnion({ name: title, image: poster, id: id }),
      });
    }
    if (currentFav) {
      setCurrentFav(false);
      await updateDoc(userRef, {
        "movies.favourites": arrayRemove({
          name: title,
          image: poster,
          id: id,
        }),
      });
    }
  };

  return (
    <div
      className="movieHero-container"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop})`,
      }}
    >
      <img
        className="moviePoster"
        src={`https://image.tmdb.org/t/p/w342${poster}`}
      />

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

        {userData && (
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
                      currentWatched
                        ? "active-watched"
                        : "nonActive-tooltipIcon"
                    }
                    onClick={handleWatchedClick}
                  />
                }
                tooltip={
                  currentWatched ? "Remove from watched" : "Add to watched"
                }
              />
            )}
            {isAuth && (
              <TooltipIcon
                icon={
                  <TbHeartPlus
                    size={"1.5em"}
                    className={
                      currentFav ? "active-fav" : "nonActive-tooltipIcon"
                    }
                    onClick={handleFavClick}
                  />
                }
                tooltip={
                  currentFav ? "Remove from favourites" : "Add to favourites"
                }
              />
            )}

            <Rating
              readonly={isAuth === "true" ? false : true}
              disableFillHover={false}
              onClick={handleRating}
              size={25}
              allowFraction
              initialValue={currentRate}
            />
          </div>
        )}
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
