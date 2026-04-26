import React from 'react';
import styles from './MainSlider.module.css';
import Slider from 'react-slick';
import imgSlider1 from '../../Assets/images/main-slider-1.jpg'
import imgSlider2 from '../../Assets/images/main-slider-2.jpg'
import imgSlider3 from '../../Assets/images/main-slider-3.jpg'
import imgSlider4 from '../../Assets/images/main-slider-4.jpg'
import imgSlider5 from '../../Assets/images/main-slider-5.jpg'

const MainSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows:false,
    autoplay:true
  };
  return(<>
  <div className="container my-5">
    <div className="row gx-0">
      <div className="col-md-9">
      <Slider {...settings}>

        <img src={imgSlider1}className=' w-100' height={460} alt="" />
        <img src={imgSlider3}className=' w-100'height={460}  alt="" />
        <img src={imgSlider5}className=' w-100' height={460} alt="" />

        </Slider>
      </div>
      <div className="col-md-3">
        <img src={imgSlider4} className=' w-100'height={230} alt="" />
        <img src={imgSlider5} className=' w-100'height={230} alt="" />

      </div>
    </div>
  </div>

  </>)
};

export default MainSlider;
