import React from 'react';
import styles from './Loader.module.css';
// import { BallTriangle } from 'react-loader-spinner';
import logo from '../../Assets/images/freshcart-logo.svg'

const Loader = () => {
  return(<>
    <div className="container  my-5">
      <div className={`${styles['fade-in-out']}  my-5 mx-auto justify-content-center align-items-center d-flex  p-5 `}>
        <img className='my-5 w-25 ' src={logo}  alt="Logo" />
      </div>
    </div>

  </>)
};

export default Loader;
