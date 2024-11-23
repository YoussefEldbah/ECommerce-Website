import React, { useContext, useEffect, useState } from 'react';
import styles from './Details.module.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';
import Loader from '../Loader/Loader';
import Slider from 'react-slick';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';

const Details = () => {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };
  const [details, setDetails] = useState({})
  const [isLoading, setLoading] = useState(true)
  let params = useParams()
  async function getProductsDetaials(id) {
    let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
    setDetails(data.data)
    setLoading(false)
  }
  useEffect(() =>
     { getProductsDetaials(params.id) }, [])
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  let { addToCart, setNumOfCartItems } = useContext(CartContext)

  async function addCart(id) {
    let res = await addToCart(id)
    console.log(res);
    if (res?.data?.status == "success") {
      toast.success('Product Added Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-main text-white p-3'

      })
      setNumOfCartItems(res?.data?.numOfCartItems||0)

    } else
      toast.error('Cannot Add Product',
        {
          position: "top-right"
        });

    {

    }
  }
  return (<>
    <div className="container my-5 pt-5">
      {isLoading ? <Loader /> : <div className="row align-items-center">
        <div className="col-md-4">
          <Slider  {...settings}>
            {details?.images?.map((ele, index) =>
              <img key={index} className='w-100' src={ele} alt="" />
            )}
          </Slider>
        </div>
        <div className="col-md-8">
          <h2>{details.title}</h2>
          <h2>{details.description}</h2>
          <p>{details.category.name}</p>
          <div className="d-flex justify-content-between">
            <h5>{details.price}EGP</h5>
            <h5>{details.ratingsAverage}<i className=' fa fa-star rating-color'></i></h5>
          </div>
          <button onClick={() => addCart(details.id)} className='btn bg-main text-white  w-100' >Add To Cart</button>

        </div>

      </div>}

    </div>


  </>)
};

export default Details;
