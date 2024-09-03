import "./CategorySlider.scss";
import { categories } from "../data/categoriesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import useFetch from "../hooks/useFetch";
import { useState } from "react";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJjMjBmYTdlYzVlNmRiNjY0MzcxOGU1MzVjNTIzNGI5NSIsIm5iZiI6MTcyMjAyNjAzMi4xMDA3NTQsInN1YiI6IjY1YTE0MTdkYjM0NDA5MDEyZDY3MmM1NyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.49wnmbLJtgXWIFLx3Npd9hUk4xPIM5vuUrzbwaTdMr0",
  },
};

const CategorySlider = () => {
  const [genreId, setGenreId] = useState();

  const url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&page=1&sort_by=popularity.desc&with_genres=${genreId}`;

  const { data, loading, error } = useFetch(url, options);

  const handleOnSelect = (id) => {
    setGenreId(id);
  };
  
  console.log(data);

  return (
    <>
      <div className="layout-container">
        <h2>Categories</h2>
        <Swiper
          modules={[Navigation]}
          navigation={true}
          spaceBetween={20}
          slidesPerView={6}
          allowTouchMove={false}
          loop={true}
        >
          {categories.map((item) => {
            return (
              <SwiperSlide
                key={item.id}
                className="category-slide"
                onClick={() => handleOnSelect(item.id)}
              >
                <img src={item.image} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
};

export default CategorySlider;
