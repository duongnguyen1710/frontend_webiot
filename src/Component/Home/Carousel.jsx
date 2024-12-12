import React from 'react'
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import { CaroselData } from './CarouselData';

const Carousel = () => {
    const items = CaroselData.map((item)=>  <img className='cursor-pointer' role='presentation' src={item.image} alt=""/>)
  return (
    <AliceCarousel
    
        items={items}
        disableButtonsControls
        disableDotsControls
        autoPlay
        autoPlayInterval={1000}
        infinite
    
    />
  )
}

export default Carousel
