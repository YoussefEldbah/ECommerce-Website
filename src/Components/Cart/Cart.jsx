import React, { useContext, useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { Helmet } from 'react-helmet';
import { CartContext } from '../../Context/cartContext';
import Loader from '../Loader/Loader';
import { Link } from 'react-router-dom';
import empty from '../../Assets/images/empty_cart.svg';
import axios from "axios";
import { useQuery } from "react-query";

const Cart = () => {
  const [cartDetails, setCartDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  let { getProductCart, deleteProductFromCart, updateProductFromCart, setNumOfCartItems,clearAllProductFromCart } = useContext(CartContext);

  async function getCartDetails() {
    try {
      const { data } = await getProductCart();
      console.log(data, "getCartDetails");
      setNumOfCartItems(data?.numOfCartItems||0);
      setCartDetails(data);
    } catch (error) {
      console.error("Error fetching cart details:", error);
    } finally {
      setLoading(false);
    }
  }
  

  async function deleteProduct(id) {
    const { data } = await deleteProductFromCart(id);
    console.log(data);
    setNumOfCartItems(data?.numOfCartItems||0);
    setCartDetails(data);
  }

  async function updateProduct(id, count) {
    const { data } = await updateProductFromCart(id, count);
    console.log(data);
    data.data.products.forEach((ele) => {
      if (ele.count === 0) {
        deleteProduct(ele.product._id);
      }
    });
    setCartDetails(data);
  }


  let headers =
  { token: localStorage.getItem("userToken") }

  async function clearCart(id) {
    const { data } = await clearAllProductFromCart(id);
    console.log(data);
    setCartDetails(data);
    setNumOfCartItems(data?.numOfCartItems||0);
  }

  useEffect(() => {
    getCartDetails();
    setNumOfCartItems();
      window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);


  return (
    <>
      <Helmet>
        <title>Cart Page</title>
      </Helmet>

      {loading ? (
        <Loader />
      ) : (
        <>
          {cartDetails && cartDetails?.data?.products?.length > 0 ? (
            <div className="container p-5 mb-5">
              <div className="w-100 my-4  mx-auto p-5">
                <h1 className="mb-4">Cart Shop</h1>

                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="h5 ">
                  Number of cart items:
                    <span className="text-main">{cartDetails.numOfCartItems}</span>
                  </h3>
                  <h3 className="h5">
                    total price:{" "}
                    <span className="text-main">{cartDetails.data.totalCartPrice}EGP</span>
                  </h3>
                </div>
                <div className="d-flex justify-content-end align-items-center">
                  <button onClick={clearCart} type="button" className="btn my-2   btn-danger">
                    Clear Cart
                  </button>
                </div>

                {cartDetails?.data?.products?.map((ele) => (
                  <div key={ele.product._id} className="row mt-2  border-bottom">
                    <div className="item">
                      <div className="col-md-1">
                        <img src={ele.product.imageCover} className="w-100" alt="" />
                      </div>
                      <div className="col-md-11 mb-4">
                        <div className="d-flex justify-content-between align-items-center">
                          <div className="left-side">
                            <h4>{ele.product.title.split(" ").slice(0, 3).join(" ")}</h4>
                            <p>{ele.price}EGP</p>
                            <button
                              onClick={() => deleteProduct(ele.product._id)}
                              className="btn text-danger p-0"
                            >
                              <i className="fa-solid fa-trash-can"></i> Remove
                            </button>
                          </div>
                          <div className="right-side ">
                            <button
                              className="btn btn-outline-success"
                              onClick={() => updateProduct(ele.product._id, ele.count - 1)}
                            >
                              -
                            </button>
                            <span className="mx-3">{ele.count}</span>
                            <button
                              className="btn btn-outline-success"
                              onClick={() => updateProduct(ele.product._id, ele.count + 1)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}

                <div className="mt-3 ms-auto">
                  <Link to={"/checkout"} className=" btn btn-main  px-5 py-2 text-white bg-main ">
                    Online Payment
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className="container text-center p-5 mt-4">
              <h2>Your cart is empty</h2>
              <p>Start shopping now!</p>
              <img src={empty} className="w-50" alt="" />
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Cart;
