import React, { useContext, useEffect, useState } from 'react';
import styles from './FeatureProducts.module.css';
import axios from 'axios';
import { BallTriangle } from 'react-loader-spinner';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { CartContext } from '../../Context/cartContext';
import toast from 'react-hot-toast';

const FeatureProducts = () => {
  const { data, isLoading } = useQuery("featureProducts", getAllProducts);
  const [searchTerm, setSearchTerm] = useState("");
  const [addedWishlistIds, setAddedWishlistIds] = useState([]); 
  const filteredProducts = data?.data?.data?.filter(product => {
    return product.title.toLowerCase().includes(searchTerm.toLowerCase());
  });
  
  function getAllProducts() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }

  let { addToCart, setNumOfCartItems, addToWishList, removeToWishList } = useContext(CartContext);

  async function addCart(id) {
    let res = await addToCart(id);
    if (res?.data?.status === "success") {
      toast.success('Product Added To Cart Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-main text-white p-3'
      });
      setNumOfCartItems(res?.data?.numOfCartItems || 0);
    } else {
      toast.error('Cannot Add Product To Cart ', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-main text-white p-3'
      });
    }
  }

  async function addWish(id) {
    let { data } = await addToWishList(id);
    console.log(data);

    if (data?.status === "success") {
      toast.success('Product Added To WishList Successfully', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-main text-white p-3'
      });
      setAddedWishlistIds(prevIds => [...prevIds, id]);
    } else {
      toast.error('Cannot Add Product To WishList', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: 'bg-main text-white p-3'
      });
    }
  }

  async function removeFromWishlist(id) {
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
        setAddedWishlistIds(prevIds => prevIds.filter(item => item !== id));
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
      }
    } catch (error) {
      console.error("Error removing product from wishlist:", error);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <div className="container my-5 py-5">
        <div className=" w-75 mx-auto my-5">
          <input
            type="text"
            placeholder="Search By Title"
            name="name"
            className="form-control mb-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {isLoading ? (
          <div className="d-flex justify-content-center">
            <BallTriangle height={100} width={100} radius={5} color="#4fa94d" />
          </div>)
          : (
            <div className="row">
              {filteredProducts.map((ele) => (
                <div key={ele.id} className="col-md-3">
                  <div className="product px-2 py-3">
                    <Link className=" text-decoration-none  text-dark  fs-bold " to={'/details/' + ele.id}>
                      <img src={ele.imageCover} className="w-100" alt={ele.title} />
                      <p className="text-main ">{ele.category.name}</p>
                      <h3 className="h6">{ele.title.split(" ").slice(0, 3).join(" ")}</h3>
                      <div className="d-flex justify-content-between">
                        <p>{ele.price}EGP</p>
                        <p>
                          <i className="fa fa-star rating-color"></i>
                          {ele.ratingsAverage}
                        </p>
                      </div>
                    </Link>
                    <div className="btn border-0 d-flex justify-content-between align-items-center">
                      <button onClick={() => addCart(ele.id)} className="btn bg-main text-white w-50">Add To Cart</button>
                      <span
                        onClick={() => addedWishlistIds.includes(ele.id) ? removeFromWishlist(ele.id) : addWish(ele.id)}
                        style={{ color: addedWishlistIds.includes(ele.id) ? 'red' : 'black' }}
                      >
                        <i className= "fa-solid fa-heart fs-4 " />
                      </span>
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

export default FeatureProducts;
