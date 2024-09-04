import "./MovieSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/scss";
import "swiper/scss/navigation";

import useFetch from "../hooks/useFetch";

import { Link } from "react-router-dom";

const MovieSlider = ({ sliderHeader, url, options, type }) => {
  const { data, loading, error } = useFetch(url, options);
  if (loading) return <p>Loading</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="layout-container">
      <h2>{sliderHeader}</h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={3}
        navigation={true}
        spaceBetween={20}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
        allowTouchMove={false}
        loop={true}
      >
        {data.results.map((movie) => {
          return (
            <SwiperSlide
              key={movie.id}
              className={
                type === "category" ? `category-slide` : `normal-slide`
              }
            >
              <Link>
                <img
                  className="poster-img"
                  src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
                />
                <div className="movieInfo-container">
                  <h3>{movie.title}</h3>
                  <p>
                    {Number.parseFloat(movie.vote_average).toFixed(1)}{" "}
                    <img src="/star-svgrepo-com.svg" />
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieSlider;
