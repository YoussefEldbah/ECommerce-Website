import React, { useEffect, useState } from 'react';
import styles from './ForgetPassword.module.css';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';


const ForgetPassword = () => {
  const [forgetLoading, setForgetLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const navigate = useNavigate(); // Add useNavigate hook

  const validationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email address').required("Email is required")
  });

  const ForgetPasswordForm = useFormik({
    initialValues: {
      email: ''
    },
    validationSchema: validationSchema,
    onSubmit: callForgetPassword
  });

  async function callForgetPassword(values) {
    setForgetLoading(true);
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, values);
      console.log(response.data);
      if (response?.data?.statusMsg === 'success') {
        console.log("success");
        document.querySelector('.forget').classList.add('d-none');
        document.querySelector('.verfiyCode').classList.remove('d-none');
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setForgetLoading(false);
    }
  }

  const validationSchema2 = Yup.object().shape({
    resetCode: Yup.string().required('Reset code is required')
  });

  const sendCode = useFormik({
    initialValues: {
      resetCode: ''
    },
    validationSchema: validationSchema2,
    onSubmit: callVerifyCode
  });

  async function callVerifyCode(values) {
    setVerifyLoading(true);
    try {
      const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, values);
      console.log(response.data);
      navigate("/resetpassword"); // Use the navigate function to redirect
    } catch (error) {
      console.error('Error:', error);
      toast.error("Reset code is invalid or has expired", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        className: ' text-dark p-3'
      });
    } finally {
      setVerifyLoading(false);
    }
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Helmet>
        <title>Forget Password</title>
      </Helmet>
      <div className="container my-5 w-75">
      <h2 className='mt-5 pt-5'>Forget Password:</h2>

        <div className="forget   p-3">
          <form className=' mycard p-3' onSubmit={ForgetPasswordForm.handleSubmit}>
            <div className="form-group my-3">
              <label className="mb-1" htmlFor="email">Email :</label>
              <input type="email" id="email" name="email" onBlur={ForgetPasswordForm.handleBlur} className="form-control mb-3" value={ForgetPasswordForm.values.email} onChange={ForgetPasswordForm.handleChange} />
              {ForgetPasswordForm.errors.email && ForgetPasswordForm.touched.email ? <div className=' alert alert-danger'>{ForgetPasswordForm.errors.email}</div> : null}
            </div>
            <button type="submit" className="btn btn-lg bg-main text-white border-0 d-block ms-auto" disabled={!(ForgetPasswordForm.isValid && ForgetPasswordForm.dirty) || forgetLoading}>
              {forgetLoading ? <i className="fa fa-spinner fa-spin"></i> : "Submit"}
            </button>
          </form>
        </div>
        <div className="verfiyCode mycard  d-none p-3">
          <h2 className='mt-5'>Verification Code:</h2>
          <form onSubmit={sendCode.handleSubmit}>
            <div className="form-group my-3">
              <label className="mb-1" htmlFor="resetCode">Code :</label>
              <input type="text" id="resetCode" name="resetCode" onBlur={sendCode.handleBlur} className="form-control mb-3" value={sendCode.values.resetCode} onChange={sendCode.handleChange} />
              {sendCode.errors.resetCode && sendCode.touched.resetCode ? <div className=' alert alert-danger'>{sendCode.errors.resetCode}</div> : null}
            </div>
            <button type="submit" className="btn btn-lg text-white border-0 bg-main d-block ms-auto" disabled={!(sendCode.isValid && sendCode.dirty) || verifyLoading}>
              {verifyLoading ? <i className="fa fa-spinner fa-spin"></i> : "Send Code"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
