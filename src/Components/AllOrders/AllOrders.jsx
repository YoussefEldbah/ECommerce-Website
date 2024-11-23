import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';

import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import moment from 'moment';
import { Helmet } from 'react-helmet';

const AllOrders = () => {

    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const { id } = jwtDecode(localStorage.getItem('userToken'));

    async function getAllOrders(id) {
        try {
            const date = await axios.get('https://ecommerce.routemisr.com/api/v1/orders/user/' + id);
            setOrders(date?.data);
            console.log(orders);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching orders:', error);
        }
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        getAllOrders(id);
    }, []);

    return (
        <>
            <Helmet>
                <title>Your Orders</title>
            </Helmet>
            <div className="container my-5 pt-5">
                {loading ? (
                    <Loader />
                ) : (
                    <>
                        {orders?.map((order) => (
                            <div className="orders my-3" key={order.id}>
                                <div className="row">
                                    <div className="d-flex align-items-center">
                                        <h2 className="fw-bolder h1">#{order?.id}</h2>
                                        <h4 className="fw-bold text-warning  mx-4">Processing</h4>
                                    </div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th>Order Date</th>
                                                <th>Ordered Items</th>
                                                <th>Total Amount</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>{moment(order?.orderDate).format('YYYY-MM-DD')}</td>
                                                <td>
                                                    <p>You Have Ordered {order?.cartItems?.length} items.</p>
                                                    <div className="d-flex">
                                                        {order?.cartItems?.map((item) => (
                                                            <img src={item?.product?.imageCover} className=' img-thumbnail mx-1' key={item._id} style={{ width: 150 }} alt="" />
                                                        ))}
                                                    </div>
                                                </td>
                                                <td>{order?.totalOrderPrice}EGP</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        ))}
                        <Link className='h4 text-main text-center' to={'/products'}>New Orders+</Link>
                    </>
                )}
            </div>
        </>
    );
};

export default AllOrders;
