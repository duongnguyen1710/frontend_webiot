import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { CategoryCarouselData } from "./CategoryCarouselData";
import CategoryCarouselItem from "./CategoryCarouselItem";

const CategoryCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };
  return (
    <div>
      <Slider {...settings}>
        {CategoryCarouselData.map(item => (
          <CategoryCarouselItem image={item.image} title={item.title} />
        ))}
      </Slider>
    </div>
  );
};

export default CategoryCarousel;
