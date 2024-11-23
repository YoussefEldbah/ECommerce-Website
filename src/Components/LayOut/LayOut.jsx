import React from 'react';
import styles from './LayOut.module.css';
import NavBar from '../NavBar/NavBar';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Toaster } from 'react-hot-toast';


const LayOut = () => {
  return(<>
 <NavBar/>
 <Outlet/>
 <Toaster/>
 <Footer/>
  </>)
};

export default LayOut;
