import { Swiper, SwiperSlide } from "swiper/react";
import "./CastSlider.scss";
import { Navigation } from "swiper/modules";

import { imagesURL } from "./../data/tmdb";
import { useRef } from "react";

const normalBreakpoints = {
  200: {
    slidesPerView: 4,
    spaceBetween: 10,
  },
  568: {
    slidesPerView: 5,
    spaceBetween: 40,
  },
  1024: {
    slidesPerView: 7,
    spaceBetween: 20,
  },
};

const CastSlider = ({ cast }) => {
  const nextRef = useRef(null);
  const prevRef = useRef(null);

  return (
    <div className="castSlider-container">
      <h2>Cast</h2>
      <Swiper
        modules={[Navigation]}
        slidesPerView={7}
        spaceBetween={30}
        breakpoints={normalBreakpoints}
        onInit={(swiper) => {
          // Override default navigation to custom buttons
          swiper.params.navigation.prevEl = prevRef.current;
          swiper.params.navigation.nextEl = nextRef.current;
          swiper.navigation.init();
          swiper.navigation.update();
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
      >
        {cast.map((member) => (
          <SwiperSlide key={member.id}>
            <img
              src={
                member.profile_path
                  ? imagesURL + member.profile_path
                  : "https://www.bluelife.mu/wp-content/uploads/2016/07/Empty-profile-photo.png"
              }
            />
            <p>{member.name}</p>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Next and Previous Buttons */}
      <div className="custom-navigation">
        <button ref={prevRef} className="custom-prev">
          <svg
            fill="#fff"
            viewBox="0 0 32 32"
            xmlns="http://www.w3.org/2000/svg"
            width="50" // Set the width
            height="50" // Set the height
          >
            <polygon points="16 8 17.43 9.393 11.85 15 24 15 24 17 11.85 17 17.43 22.573 16 24 8 16 16 8"></polygon>
            <path d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"></path>
          </svg>
        </button>
        <button ref={nextRef} className="custom-next">
          <svg
            fill="#fff"
            viewBox="0 0 32 32"
            width="50" // Set the width
            height="50" // Set the height
            xmlns="http://www.w3.org/2000/svg"
          >
            <polygon points="16 8 14.57 9.393 20.15 15 8 15 8 17 20.15 17 14.57 22.573 16 24 24 16 16 8"></polygon>
            <path d="M16,30A14,14,0,1,1,30,16,14.0158,14.0158,0,0,1,16,30ZM16,4A12,12,0,1,0,28,16,12.0137,12.0137,0,0,0,16,4Z"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CastSlider;
