import React, { useEffect } from 'react';
import styles from './Brands.module.css';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Brands = () => {


  function getBrands(){
    return axios.get(`https://route-ecommerce.onrender.com/api/v1/brands`)
  }

  const { data ,isLoading}=useQuery("getBrands",getBrands)
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  return(<>
  <Helmet>
        <title>Brands Page</title>
    </Helmet>
 

 {isLoading? <Loader/>:<div className="container p-5 my-5 ">
  <h1 className='text-main text-center'>All Brands</h1> <div className="row my-5 g-4">
   {data?.data?.data?.map((ele,index)=> <div key={index} className="col-md-3">
   <div className="card product" >
  <img src={ele.image} className="img-fluid" alt={ele.image} />
  <div className="card-body">
    <h5 className="card-title  text-center">{ele.name}</h5>
   
  </div>
</div>

    </div>)}
  </div> </div>}


  </>)
};

export default Brands;
