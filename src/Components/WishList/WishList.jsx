import React, { useContext, useEffect, useState } from 'react';
import styles from './WishList.module.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContext';
import { BallTriangle } from 'react-loader-spinner';
import toast from 'react-hot-toast';
import emptyWishlistImage from '../../Assets/images/wishlist_re_m7tv.svg';
import Loader from '../Loader/Loader';

const WishList = () => {
  const { getWishList, addToCart,setNumOfCartItems, removeToWishList } = useContext(CartContext);

  const [dateInWishList, setDateInWishList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getWishlist() {
    try {
      const { data } = await getWishList();
      console.log(data);
      setDateInWishList(data);
      console.log(dateInWishList);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setIsLoading(false);
    }
  }

  async function addCart(id) {
    try {
      const res = await addToCart(id);
      if (res?.data?.status === "success") {
        toast.success('Product Added To WishList Successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-main text-white p-3'
        });
        setNumOfCartItems(res?.data?.numOfCartItems );

      } else {
        toast.error('Cannot Add Product To WishList ', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-main text-white p-3'
        });
        setNumOfCartItems(res?.data?.numOfCartItems );

      }
    } catch (error) {
      console.error("Error adding product to wishlist:", error);
    }
  }

  async function deleteItemWishList(id) {
    try {
      const res = await removeToWishList(id);
      if (res?.data?.status === "success") {
        toast.error('Product Removed From WishList Successfully', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-main text-white p-3'
        });
        getWishlist();
      } else {
        toast.error('Cannot Remove Product From WishList ', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          className: 'bg-main text-white p-3'
        });
        setNumOfCartItems(res?.data?.numOfCartItems );

      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
    getWishlist();
  }, []);

  return (
    <>
      <Helmet>
        <title>WishList Page</title>
      </Helmet>
      <div className="container my-5  pt-5">
        {isLoading ? (
          <Loader/>
        ) : dateInWishList?.data?.length === 0 ? (
         <> <h1 className='text-main text-center '>WishList</h1>

         <div className="d-flex justify-content-center my-5 ">
           
           <img src={emptyWishlistImage} className='w-50' alt="Empty Wishlist" />
         </div></>
        ) : (
          <div className="row my-5">
            {dateInWishList?.data?.map((ele) => (
              <div key={ele.id} className="col-md-3">
                <div className="product  p-2">
                  <Link className="text-decoration-none text-dark fs-bold" to={'/details/' + ele.id}>
                    <img src={ele.imageCover} className="w-100" alt={ele.title} />
                    <p className="text-main">{ele.category.name}</p>
                    <h3 className="h6">{ele.title.split(" ").slice(0, 3).join(" ")}</h3>
                    <div className="d-flex justify-content-between">
                      <p>{ele.price}EGP</p>
                      <p>
                        <i className="fa fa-star rating-color"></i>
                        {ele.ratingsAverage}
                      </p>
                    </div>
                  </Link>
                  <div className="btn d-flex border-0  justify-content-between align-items-center">
                    <button onClick={() => addCart(ele.id)} className="btn bg-main text-white w-50">Add To Cart</button>
                    <span onClick={() => deleteItemWishList(ele.id)}><i className={`${styles.icon} fa-solid fs-4  fa-heart`} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default WishList;
