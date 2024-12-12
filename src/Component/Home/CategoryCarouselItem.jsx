import React from "react";

const CategoryCarouselItem = ({ image, title }) => {
  return (
    <div className="border-t-2 border-b-2 border-gray-500 py-4">
      <div className="flex flex-col justify-center items-center">
        <img
          className="w-[6rem] h-[6rem] lg:h-[8rem] lg:w-[8rem] rounded-full object-cover object-center"
          src={image}
          alt=""
        />
        <span className="py-5 font-bold tracking-tight text-gray-900 ">
          {title}
        </span>
      </div>
    </div>
  );
};

export default CategoryCarouselItem;
