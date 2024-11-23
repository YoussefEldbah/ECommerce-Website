import React, { useEffect } from 'react';
import styles from './Home.module.css';
import MainSlider from '../MainSlider/MainSlider';
import CatSlider from '../CatSlider/CatSlider';
import { Helmet } from 'react-helmet';
import FeatureProducts from '../FeatureProducts/FeatureProducts';

const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);
  return(<>

    <Helmet>
        <title>Home Page</title>
    </Helmet>
   <MainSlider/>
   <CatSlider/>
   <FeatureProducts/>
  </>)
};

export default Home;
