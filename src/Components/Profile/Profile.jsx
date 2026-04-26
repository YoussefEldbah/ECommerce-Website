import React, { useEffect, useState } from 'react';
import styles from './Profile.module.css';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { jwtDecode } from 'jwt-decode';

const Profile = () => {
  const userToken = localStorage.getItem('userToken');
  const decodedData = userToken ? jwtDecode(userToken) : null;
  const name = decodedData ? decodedData.name : '';
  const role = decodedData ? decodedData.role : '';
  const email = decodedData ? decodedData.email : '';
  const [loading, setLoading] = useState(false); 
  
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(name, role);
    // Set loading to false because we have data from localStorage
  }, []); // Empty dependency array means this runs once when the component mounts

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
      </Helmet>
      <div className='container my-5 pt-5'>
        {/* If you want a loading state, you can keep it, but it's not necessary */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <h1 className='text-main text-center mb-4'>Profile</h1>
            <div className={`${styles.mycard} card mx-auto mt-3 w-50`}>
              <div className="card-header">
                <div className="user fs-5 fw-bolder d-flex align-items-center justify-content-start">
                  <i className="fa-regular fs-5 text-dark fa-user"></i> Your Info
                </div>
              </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"><strong>Name:</strong> {name}</li>
                <li className="list-group-item"><strong>Email:</strong> {email}</li>
                <li className="list-group-item"><strong>Role:</strong> {role}</li>
                <li className="list-group-item">
                  <Link className='btn btn-outline-info' to={'/updatedate'}>
                    <i className="fa-solid me-2 fa-pen-to-square"></i>Update Your Data
                  </Link>
                </li>
                <li className="list-group-item">
                  <Link className='btn btn-outline-info' to={'/updatepassword'}>
                    <i className="fa-solid me-2 fa-lock"></i>Update Your Password
                  </Link>
                </li>
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
