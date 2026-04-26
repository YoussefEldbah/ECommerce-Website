import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let CartContext = createContext();

let headers = { token: localStorage.getItem("userToken") };

function addToCart(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,
        { productId: id }, {
        headers
    }).then((res) => res).catch((err) => err);
}


function getProductCart() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,
        {
            headers
        }).then((res) => res).catch((err) => err);
}

function deleteProductFromCart(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        {
            headers
        }).then((res) => res).catch((err) => err);
}
function getUserProfile(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/addresses/${id}`,
        {
            headers
        }).then((res) => res).catch((err) => err);
}

function updateProductFromCart(id, count) {
    return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,
        { "count": count },
        {
            headers
        }).then((res) => res).catch((err) => err);
}

function addToWishList(id) {
    return axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: id }, {
        headers
    }).then((res) => res).catch((err) => err);
}
function getWishList() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
         {
        headers
    }).then((res) => res).catch((err) => err);
}


function removeToWishList(id) {
    return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
         {
        headers
    }).then((res) => res).catch((err) => err);
}

function getAllOrders(id) {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
         {
        headers
    }).then((res) => res).catch((err) => err);
}






export default function CartContextProvider(props) {
    let [cartId, setCartId] = useState(null);
    let [numOfCartItems, setNumOfCartItems] = useState(null);

    function onlinePayment(shippingAddress) {
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:3000`,
            { shippingAddress },
            {
                headers
            }).then((res) => res).catch((err) => err);
    }

    function clearAllProductFromCart() {
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,
            {
                headers
            }).then((res) => res).catch((err) => err);
    }
    // function UpdateUserDate() {
    //     return axios.put(`https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
    //         {
    //             headers
    //         }).then((res) => res).catch((err) => err);
    // }

    async function getInitialCart() {
        let response = await getProductCart();
        let num = response?.data?.numOfCartItems;
        let id = response?.data?.data?._id;

        setNumOfCartItems(num);
        setCartId(id);
    }

    useEffect(() => {
        getInitialCart();
    }, []);

    return (
        <CartContext.Provider value={{ addToCart, getProductCart, deleteProductFromCart, updateProductFromCart, onlinePayment, numOfCartItems, setNumOfCartItems, clearAllProductFromCart, getInitialCart, addToWishList,getWishList,removeToWishList,getAllOrders,getUserProfile }}>
            {props.children}
        </CartContext.Provider>
    );
}
