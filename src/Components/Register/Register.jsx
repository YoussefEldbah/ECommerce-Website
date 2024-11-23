// import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import styles from './Register.module.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';


const Register = () => {
  const [errMessage, setErrorMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate()
  const validationSchema = Yup.object().shape({
    name: Yup.string().min(3, "Name must be at least 3 characters").required("Name is required"),
    email: Yup.string().email('Invalid email address').required("Email is required"),
    password: Yup.string().matches(/^[A-Z][a-z0-9]{3,8}$/, "must be * Start with a letter (either uppercase or lowercase).  * Be between 6 and 9 characters in total.* Can only contain letters (A-Z or a-z) and numbers (0-9)").required("Password is required"),
    rePassword: Yup.string().oneOf([Yup.ref('password')], "Passwords must match").required("re-Password is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone number is required")
  });
  async function callRegister(reqBody) {
    setErrorMessage("")
    setIsLoading(true)
    const { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/signup`, reqBody)
      .catch(err => {{setIsLoading(false)}
        setErrorMessage(err.response.data.message)
      })
    console.log(data);
    if (data.message == "success") {
      navigate("/login");
    }
  }
  const registerForm = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      rePassword: '',
      phone: '',
    },
    validationSchema: validationSchema,
    onSubmit: callRegister
  });
useEffect(() => {
  window.scrollTo(0, 0); // Scroll to top on component mount
}, [])

  return (<>
   <Helmet>
        <title>Register Page</title>
    </Helmet>
    <div className="container my-5 w-75">
     <div className="title pt-2">
     <h2 className='mt-5'>Register now</h2>
     </div>
      {errMessage ? <div className=' alert alert-danger'>{errMessage}</div> : null}
      <form className='mycard p-3 my-3' onSubmit={registerForm.handleSubmit}>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="name">
            Name :
          </label>
          <input type="text" id="name" name="name" onBlur={registerForm.handleBlur} className="form-control mb-3" value={registerForm.values.name} onChange={registerForm.handleChange} />
          {registerForm.errors.name && registerForm.touched.name ? <div className=' alert alert-danger'>{registerForm.errors.name}</div> : null}
        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="email">
            Email :
          </label>
          <input type="email" id="email" name="email" onBlur={registerForm.handleBlur} className="form-control mb-3" value={registerForm.values.email} onChange={registerForm.handleChange} />
          {registerForm.errors.email && registerForm.touched.email ? <div className=' alert alert-danger'>{registerForm.errors.email}</div> : null}
        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="password">
            Password :
          </label>
          <input type="password" id="password" onBlur={registerForm.handleBlur} name="password" className="form-control mb-3" value={registerForm.values.password} onChange={registerForm.handleChange} />
          {registerForm.errors.password && registerForm.touched.password ? <div className=' alert alert-danger'>{registerForm.errors.password}</div> : null}

        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="rePassword">
            Re-password :
          </label>
          <input type="password" id="rePassword" name="rePassword" onBlur={registerForm.handleBlur} className="form-control mb-3" value={registerForm.values.rePassword} onChange={registerForm.handleChange} />
          {registerForm.errors.rePassword && registerForm.touched.rePassword ? <div className=' alert alert-danger'>{registerForm.errors.rePassword}</div> : null}
        </div>
        <div className="form-group my-3">
          <label className="mb-1" htmlFor="phone">
            Phone :
          </label>
          <input type="tel" id="phone" name="phone" onBlur={registerForm.handleBlur} className="form-control mb-3" value={registerForm.values.phone} onChange={registerForm.handleChange} />
          {registerForm.errors.phone && registerForm.touched.phone ? <div className=' alert alert-danger'>{registerForm.errors.phone}</div> : null}
        </div>
        <button type="submit" className="btn btn-lg text-white border-0 bg-main d-block ms-auto" disabled={!(registerForm.isValid && registerForm.dirty)}>
          {isLoading ? <i className=' fa fa-spinner fa-spin'></i> : 'Register now'}

        </button>
      </form>
    </div>
   </>
  );
};

export default Register;
