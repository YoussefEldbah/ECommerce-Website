import React, { useEffect, useState } from 'react';
import styles from './CatSlider.module.css';
import axios from 'axios';
import Slider from 'react-slick';

const CatSlider = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8,
    slidesToScroll: 1,
    autoplay:true 
  };
  const[categories,setCategories] =useState([])
  
  async function getCategories() {
    let { data } =await axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    setCategories(data.data)
  }
  useEffect(()=> {
    getCategories()
      window.scrollTo(0, 0); // Scroll to top on component mount
  },[])
  return(<>
  <div className="container my-5">
   <Slider {...settings}>
      {categories.map((cat,index)=>   <div key={index} className="cat px-1 ">
        <img src={cat.image} className=' w-100' height={'200'} alt="" />
        <h5>{cat.name}</h5>
      </div>)}
    </Slider>
    
    
    </div>
  </>)
};

export default CatSlider;
