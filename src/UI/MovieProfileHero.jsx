import "./MovieProfileHero.scss";
import { useEffect, useMemo, useState } from "react";

import { releaseDateFormatter, runtimeFormatter } from "../utilties/functions";

import { Rating } from "react-simple-star-rating";
import { TbEyeCheck, TbHeartPlus } from "react-icons/tb";
import TooltipIcon from "./TooltipIcon";
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

  let isUserFav;
  let isUserWatched;
  let userCurrentReviews;
  let userRef; //getting reference to the user doc

  if (userData) {
    isUserFav = userData.movies.favourites.includes(id);
    isUserWatched = userData.movies.watched.includes(id);
    userCurrentReviews = userData.movies.reviews;
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
  const [userReviews, setUserReviews] = useState(userCurrentReviews);

  // const existingReview = ;

  useEffect(() => {
    const updateReviews = async () => {
      await updateDoc(userRef, {
        "movies.reviews": userReviews,
      });
    };
    updateReviews();
  }, [userReviews, userRef]);

  const handleRating = async (rate) => {
    let updatedUserReviews;

    //if review already exists, find it's index and update it with the new value
    if (userReviews.find((review) => review.id === id)) {
      const existingReviewIndex = userReviews.findIndex(
        (review) => review.id === id
      );
      updatedUserReviews = userReviews.map(
        (
          review,
          index // create new updated array with the review updated
        ) =>
          index === existingReviewIndex ? { ...review, rate: rate } : review
      );
    }
    //if review is new, append it to the reviews array
    if (!userReviews.find((review) => review.id === id)) {
      updatedUserReviews = [...userReviews, { id: id, rate: rate }];
    }

    //update the state to trigger the firestore update
    setUserReviews(updatedUserReviews);
  };

  const handleWatchedClick = async () => {
    //if the movie is not watched in the user's database, add it on click.
    if (!currentWatched) {
      setCurrentWatched(true);
      await updateDoc(userRef, {
        "movies.watched": arrayUnion(id),
      });
    }
    //if the movie is watched in the user's database, remove it on click.
    if (currentWatched) {
      setCurrentWatched(false);
      await updateDoc(userRef, {
        "movies.watched": arrayRemove(id),
      });
    }
  };

  const handleFavClick = async () => {
    //if the movie is not in the user's database, add it onclick
    if (!currentFav) {
      setCurrentFav(true);
      await updateDoc(userRef, {
        "movies.favourites": arrayUnion(id),
      });
    }
    //if the movie is in the user's database, remove it onclick
    if (currentFav) {
      setCurrentFav(false);
      await updateDoc(userRef, {
        "movies.favourites": arrayRemove(id),
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
              initialValue={
                userReviews.find((review) => review.id === id)
                  ? userReviews.find((review) => review.id === id).rate
                  : 0
              }
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
