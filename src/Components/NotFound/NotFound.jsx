import React, { useContext } from 'react';
import styles from './NotFound.module.css';
import notFoundImg from '../../Assets/images/error.svg'
import { Helmet } from 'react-helmet';

const NotFound = () => {

  return (<>
    <Helmet>
      <title>NotFound Page</title>
    </Helmet>
    <section className="container w-75 pt-4 my-5 text-center">
    <img src={notFoundImg} className='w-75' alt=""  />
      </section>

 










  </>)
};

export default NotFound;
