import "./MovieSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";

import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";
import MovieCard from "../UI/MovieCard";

const MovieSlider = ({ sliderHeader, url, options, type }) => {
  const { data, loading, error } = useFetch(url, options);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

const normalBreakpoints={
  200: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  768: {
    slidesPerView: 4,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
}

const largeBreakpoints={
  200: {
    slidesPerView: 2,
    spaceBetween: 10,
  },
  342:{
    slidesPerView:3,
    spaceBetween:5
  },
  762: {
    slidesPerView: 4,
    spaceBetween: 5,
  },
  1024: {
    slidesPerView:5 ,
    spaceBetween: 5,
  },

}


  return (
    <div className="layout-container">
      <h2>{sliderHeader}</h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={type==='trending'?5:7}
        navigation={true}
        spaceBetween={5}
        breakpoints={type==='trending'?largeBreakpoints:normalBreakpoints}
        allowTouchMove={false}
        loop={true}
        className={type!=='trending'?'regularSlider':'trendingSlider'}
      >
        {data.results.map((movie) => {
          return (
            <SwiperSlide key={movie.id}>
              {type === "trending" ? (
                <MovieCard
                  rank={data.results.indexOf(movie) + 1}
                  image={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  title={movie.title}
                />
              ) : (
                <Link className="movieSlide-container">
                  <img
                    className="poster-img"
                    src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                  />
                  <div className="movieInfo-container">
                    <h3>{movie.title}</h3>
                    <p>
                      {Number.parseFloat(movie.vote_average).toFixed(1)}
                      <img src="/star-svgrepo-com.svg" />
                    </p>
                  </div>
                </Link>
              )}
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
