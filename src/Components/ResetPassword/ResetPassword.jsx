import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import { Helmet } from 'react-helmet';
import { TokenContext } from '../../Context/Token';


const ResetPassword = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  let {setToken}=useContext(TokenContext)


  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required"),
    newPassword: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "Password must be 6-9 characters, start with a letter, and contain only letters and numbers").required("Password is required"),
  });

  async function resetPassword(reqBody) {
    setIsLoading(true);
    try {
      const { data } = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, reqBody);
      console.log(data);
      if (data?.status === "Success") {
        // localStorage.setItem("userToken" ,data.token)
        // setToken(data.token)
        // navigate("/login");
      }
    } catch (err) {
      setIsLoading(false);
    }
  }

  const resetPasswordForm = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: resetPassword
  });
  useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  return (<>
    <Helmet>
        <title>Reset Password</title>
    </Helmet>
    <div className="container my-5 w-75">
     <div className="title pt-2">
     <h2 className='mt-5'>Reset Password</h2>
     </div>
      <form  onSubmit={resetPasswordForm.handleSubmit}>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="email">Email :</label>
          <input type="email" id="email" name="email" onBlur={resetPasswordForm.handleBlur} className="form-control mb-3" value={resetPasswordForm.values.email} onChange={resetPasswordForm.handleChange} />
          {resetPasswordForm.errors.email && resetPasswordForm.touched.email ? <div className=' alert alert-danger'>{resetPasswordForm.errors.email}</div> : null}
        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="newPassword">newPassword :</label>
          <input type="password" id="newPassword" onBlur={resetPasswordForm.handleBlur} name="newPassword" className="form-control mb-3" value={resetPasswordForm.values.newPassword} onChange={resetPasswordForm.handleChange} />
          {resetPasswordForm.errors.newPassword && resetPasswordForm.touched.newPassword ? <div className=' alert alert-danger'>{resetPasswordForm.errors.newPassword}</div> : null}
        </div>
        <button type="submit" className="btn btn-lg text-white border-0 bg-main d-block ms-auto" disabled={!(resetPasswordForm.isValid && resetPasswordForm.dirty)}>
          {isLoading ? <i className=' fa fa-spinner fa-spin'></i> : 'Login now'}
        </button>
      </form>
    </div>
  </>
  
  );
};

export default ResetPassword;
