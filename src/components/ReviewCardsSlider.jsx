import "./ReviewCardsSlider.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ReviewCard from "../UI/ReviewCard";

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

const ReviewCardsSlider = ({ reviews }) => {
  console.log(reviews);
  return (
    <div>
      <Swiper modules={[Navigation]} slidesPerView={4} spaceBetween={15}>
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
