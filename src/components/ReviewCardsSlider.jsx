import "./ReviewCardsSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ReviewCard from "../UI/ReviewCard";

const normalBreakpoints = {
  200: {
    slidesPerView: 1,
    spaceBetween:20,
  },
  515: {
    slidesPerView: 2,
    spaceBetween: 40,
  },
  800:{
    slidesPerView: 3 ,
    spaceBetween: 30,

  },
  1075: {
    slidesPerView: 4 ,
    spaceBetween: 20,
  },
};

const ReviewCardsSlider = ({ reviews }) => {
  console.log(reviews)

  return (
    <div className="reviewSection-container">
      <Swiper
        modules={[Navigation]}
        slidesPerView={4}
        spaceBetween={15}
        breakpoints={normalBreakpoints}
      >
        {reviews.results.map((review) => (
          <SwiperSlide key={review.id}>
            <ReviewCard
              author={review.author}
              content={review.content}
              date={review.created_at}
              reviewURL={review.url}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default ReviewCardsSlider;
