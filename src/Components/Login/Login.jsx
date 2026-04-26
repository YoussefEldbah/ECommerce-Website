import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { TokenContext } from '../../Context/Token';
import { Helmet } from 'react-helmet';
import styles from './Login.module.css'


const Login = () => {
  const [errMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  let {setToken}=useContext(TokenContext)
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must be 6-9 characters, start with a letter, and contain only letters and numbers").required("Password is required"),
  });

  async function callLogin(reqBody) {
    setErrorMessage("");
    setIsLoading(true);
    try {
      const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, reqBody);
      console.log(data);
      if (data.message === "success") {
        localStorage.setItem("userToken" ,data.token)
        setToken(data.token)
        navigate("/home");
      }
    } catch (err) {
      setIsLoading(false);
      setErrorMessage(err.response.data.message);
    }
  }

  const loginForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: callLogin
  });
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (<>
    <Helmet>
        <title>Login Page</title>
    </Helmet>
    <div className="container my-5 w-75">
     <div className="title pt-2">
     <h2 className='mt-5'>Login now</h2>
     </div>
      {errMessage ? <div className=' alert alert-danger'>{errMessage}</div> : null}
      <form className='mycard p-3 my-3' onSubmit={loginForm.handleSubmit}>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" onBlur={loginForm.handleBlur} className="form-control mb-3" value={loginForm.values.email} onChange={loginForm.handleChange} />
          {loginForm.errors.email && loginForm.touched.email ? <div className=' alert alert-danger'>{loginForm.errors.email}</div> : null}
        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="password">Password :</label>
          <input type="password" id="password" onBlur={loginForm.handleBlur} name="password" className="form-control mb-3" value={loginForm.values.password} onChange={loginForm.handleChange} />
          {loginForm.errors.password && loginForm.touched.password ? <div className=' alert alert-danger'>{loginForm.errors.password}</div> : null}
        </div>
        <button type="submit" className="btn btn-lg text-white border-0 bg-main d-block ms-auto" disabled={!(loginForm.isValid && loginForm.dirty)}>
          {isLoading ? <i className=' fa fa-spinner fa-spin'></i> : 'Login now'}
        </button>
      </form>
      <Link to={'/forgetpassword'} className='text-main' >Forget Password...</Link>
    </div>
  </>
  
  );
};

export default Login;
