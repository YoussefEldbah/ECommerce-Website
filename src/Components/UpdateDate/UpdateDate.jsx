import React from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './UpdateDate.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UpdateDate = () => {
  const navigate = useNavigate(); // Importing useNavigate

  const validationSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    phone: Yup.string().required('Phone is required'),
    email: Yup.string().email('Invalid email address').required('Email is required'),
  });

  const handleSubmit = async (values) => {
    try {
      const headers = { token: localStorage.getItem("userToken") };
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/updateMe/`,
        values,
        { headers }
      );
      console.log(data);
      
      navigate("/profile"); 
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      phone: '',
      email: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Update User Date</title>
      </Helmet>
      <div className="container my-5">
        <div className="row w-75 mx-auto p-5">
          <div className="col-md-12">
            <form className='table' onSubmit={formik.handleSubmit}>
              <h3>Update User Date:</h3>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="name">Name</label>
                <input className='form-control' type="text" name="name" id="name" value={formik.values.name} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.name && formik.errors.name ? <div className='my-3 alert alert-danger'>{formik.errors.name}</div> : null}
              </div>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="phone">Phone</label>
                <input className='form-control' type="text" name="phone" id="phone" value={formik.values.phone} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.phone && formik.errors.phone ? <div className='my-3 alert alert-danger'>{formik.errors.phone}</div> : null}
              </div>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="email">Email</label>
                <input className='form-control mb-3' type="text" name="email" id="email" value={formik.values.email} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.email && formik.errors.email ? <div className='alert alert-danger my-3'>{formik.errors.email}</div> : null}
                <button className='btn bg-main  border-0 w-100 text-white' type="submit" disabled={!formik.isValid}>Update User Data</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateDate;
