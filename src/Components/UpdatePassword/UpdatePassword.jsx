import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './UpdatePassword.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../../Context/Token';


const UpdatePassword = () => {
  const { setToken } = useContext(TokenContext); 
  const navigate = useNavigate();
  
  const validationSchema = Yup.object().shape({
    currentPassword: Yup.string().required('Current Password is required'),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must be * Start with a letter (either uppercase or lowercase).  * Be between 6 and 9 characters in total. * Can only contain letters (A-Z or a-z) and numbers (0-9)").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("Re-Password is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const headers = { token: localStorage.getItem("userToken") };
      const { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/users/changeMyPassword`,
        values,
        { headers }
      );
      console.log(data);
      if (data?.message === "success") {
        localStorage.setItem("userToken", data.token);
        setToken(data.token);
        navigate("/login");
      }
    } catch (error) {
      console.error('Error:', error);
      // Handle error here, if needed
    }
  };

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      password: '',
      rePassword: '',
    },
    validationSchema,
    onSubmit: handleSubmit,
  });

  return (
    <>
      <Helmet>
        <title>Update Password</title>
      </Helmet>
      <div className="container my-5">
        <div className="row w-75 mx-auto p-5">
          <div className="col-md-12">
            <form className='table' onSubmit={formik.handleSubmit}>
              <h3>Update Password:</h3>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="currentPassword">Current Password</label>
                <input className='form-control' type="password" name="currentPassword" id="currentPassword" value={formik.values.currentPassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.currentPassword && formik.errors.currentPassword ? <div className='my-3 alert alert-danger'>{formik.errors.currentPassword}</div> : null}
              </div>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="password">New Password</label>
                <input className='form-control' type="password" name="password" id="password" value={formik.values.password} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.password && formik.errors.password ? <div className='my-3 alert alert-danger'>{formik.errors.password}</div> : null}
              </div>
              <div className="form-group my-3">
                <label className="mb-1" htmlFor="rePassword">Re-enter Password</label>
                <input className='form-control mb-3' type="password" name="rePassword" id="rePassword" value={formik.values.rePassword} onChange={formik.handleChange} onBlur={formik.handleBlur} />
                {formik.touched.rePassword && formik.errors.rePassword ? <div className='alert alert-danger my-3'>{formik.errors.rePassword}</div> : null}
                <button className='btn bg-main w-100 text-white' type="submit" disabled={!formik.isValid}>Update Password</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
