import React, { useEffect } from 'react';
import styles from './Products.module.css';
import { Helmet } from 'react-helmet';
import FeatureProducts from '../FeatureProducts/FeatureProducts';

const Products = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  return(<>
  <Helmet>
        <title>Products Page</title>
    </Helmet>
    
   <FeatureProducts/>
  </>)
};

export default Products;
