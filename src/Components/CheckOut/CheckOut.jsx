import React, { useContext, useEffect } from 'react';
import styles from './CheckOut.module.css';
import { useFormik } from 'formik';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { CartContext } from '../../Context/cartContext';

const CheckOut = () => {
  let { onlinePayment } = useContext(CartContext)
  async function payment(values) {

    let response = await onlinePayment(values);
    let url = response?.data?.session?.url;
    console.log("URL:", url);
    window.location.href = url; 


  }

  const validationSchema = Yup.object().shape({
    details: Yup.string().min(2, "Name must be at least 3 characters").required("details is required"),
    city: Yup.string().min(3, "Name must be at least 3 characters").required("city is required"),
    phone: Yup.string().matches(/^01[0125][0-9]{8}$/, "Invalid phone number").required("Phone number is required")
  });

  const checkOutForm = useFormik({
    initialValues: {
      "details": "",
      "phone": "",
      "city": ""
    },
    validationSchema: validationSchema,
    onSubmit: payment
  })

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top on component mount
  }, []);

  return (<>
    <Helmet>
      <title>Check Out Page</title>
    </Helmet>
    <div className="container my-5">
      <div className="row w-75  mx-auto p-5">
        <div className="col-md-12">
         
          <form className='table' onSubmit={checkOutForm.handleSubmit}>
          <h3>Enter Your Shipping Details :
          </h3>
            <div className="form-group my-3">
              <label className="mb-1" htmlFor="details">
                Details
              </label>
              <input className=' form-control' type="text" name="details" id="details" value={checkOutForm.values.details} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} />
              {checkOutForm.errors.details && checkOutForm.touched.details ? <div className='my-3 alert alert-danger'>{checkOutForm.errors.details}</div> : null}


            </div>
            <div className="form-group my-3">
              <label className="mb-1" htmlFor="phone">
                Phone
              </label>
              <input className=' form-control' type="text" name="phone" id="phone" value={checkOutForm.values.phone} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} />

              {checkOutForm.errors.phone && checkOutForm.touched.phone ? <div className='my-3 alert alert-danger'>{checkOutForm.errors.phone}</div> : null}

            </div>
            <div className="form-group my-3">
              <label className="mb-1" htmlFor="city">
                City
              </label>
              <input className=' form-control mb-3' type="text" name="city" id="city" value={checkOutForm.values.city} onChange={checkOutForm.handleChange} onBlur={checkOutForm.handleBlur} />

              {checkOutForm.errors.city && checkOutForm.touched.city ? <div className=' alert alert-danger my-3'>{checkOutForm.errors.city}</div> : null}
              <button className='btn text-white border-0  bg-main w-100 ' disabled={!(checkOutForm.isValid && checkOutForm.dirty)}>Pay Now</button>
            </div>
          </form>
        </div>
      </div>
    </div>





  </>)
};

export default CheckOut;
