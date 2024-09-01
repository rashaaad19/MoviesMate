import "./CategorySlider.scss";
import { categories } from "../data/categoriesData";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";

const CategorySlider = () => {
  console.log(categories);
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
            {categories.map(item=>{
                return(
                    <SwiperSlide key={item.id} className="category-slide">
                        <img src={item.image} />
                    </SwiperSlide>
                )
            })}

        </Swiper>
      </div>
    </>
  );
};

export default CategorySlider;
