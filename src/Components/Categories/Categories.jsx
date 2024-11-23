import React, { useEffect } from 'react';
import styles from './Categories.module.css';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import axios from 'axios';
import Loader from '../Loader/Loader';

const Categories = () => {

  function getCategories(){
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
  }

  const { data ,isLoading}=useQuery("getCategories",getCategories)
console.log(data?.data?.data);
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on component mount
}, []);
  return(<>
    <Helmet>
        <title>Categories Page</title>
    </Helmet>
     

  {isLoading?<Loader/>:<div className="container py-5 my-5">
    <div className="row g-4">
    <h1 className='text-main text-center'>Categories</h1>

  {data?.data?.data.map((ele)=>  <div className="col-md-4">
<div className="card product" >
  <img src={ele.image} className="card-img-top w-100" height={300} alt="..." />
  <div className="card-body text-center fw-bold">
    <h1 className="card-text  text-main">{ele.name}</h1> 
  </div>
</div>

    </div>)}
  </div></div>  
  }
  
  


  </>)
};

export default Categories;
