import React from 'react';
import styles from './Footer.module.css';
import svg1 from '../../Assets/images/svg1.svg';
import svg2 from '../../Assets/images/svg2.svg';
import svg3 from '../../Assets/images/svg3.svg';
import svg4 from '../../Assets/images/svg4.svg';
import google from '../../Assets/images/google.png';
import apple from '../../Assets/images/apple.png';


const Footer = () => {
  return (<>

    <div className="footer  pt-2 bg-main-light ">
      <div className=" container p-3 w-75 mt-2">
        <div className="top">
          <h2>
            Get The Fresh Cart app
          </h2>
          <p className=''>
            We will send you a link, Open it on your phone to download the app.
          </p>
          <div className="row justify-content-between  align-items-center">
            <div className="col-md-10 ">
              <form className='form-group d-flex justify-content-between  ' >
                <input className='form-control ' placeholder='Email..' type="text" />
              </form>
            </div>
            <div className="col-md-2 ">
            <button className='btn bg-main text-whitepy-2 px-3 text-white '>Share App Link</button>

            </div>
          
            <div className="line mt-1 border-bottom ">
            </div>
            <div className="sec-footer my-2 ">
              <div className="row">
                <div className="col-md-7 d-flex ">

                 
                  <ul  >
                    <li>
                    <p className='me-auto'>Payment Partners
                  </p>
                    </li>
                    <li >
                      <img src={svg1} width={30} height={80} alt="" />
                    </li>
                    <li>
                    <img src={svg2} width={30} height={80} alt="" />
                    </li>
                    <li>
                    <img src={svg3} width={30} height={80}  alt="" />
                    </li>
                    <li>
                    <img src={svg4} width={40} height={100} alt="" />
                    </li>
                  </ul>


                </div>
                <div className="col-md-5  d-flex justify-content-end  align-items-center">
                  <ul >
                    <li>
                    <p>Get Delivery With FreshCart</p>

                    </li>
                    <li>
                      <img src={google} width={80} height={44} alt="" />
                    </li>
                    <li>
                    <img src={apple} width={80} height={30}  alt="" />
                    </li>
                  </ul>
                </div>

              </div>
            </div>
            <div className="line mb-3 border-bottom ">
            </div>
            <div className="row">
              <div className="col-md-9"> <p>Our Social Links</p> </div>
              <div className="col-md-3 me-auto">
                <div className={styles.socialLinks}>
                  <a  className={styles.socialLink}>
                    <i className="fa-brands fa-instagram"></i>
                  </a>

                  <a  className={styles.socialLink}>
                    <i className="fa-brands fa-facebook"></i>
                  </a>
                  <a   className={styles.socialLink}>
                    <i className="fa-brands fa-tiktok"></i>
                  </a>
                  <a   className={styles.socialLink}>
                    <i className="fa-brands fa-twitter"></i>
                  </a>
                  <a   className={styles.socialLink}>
                    <i className="fa-brands fa-linkedin"></i>
                  </a>
                  <a   className={styles.socialLink}>
                    <i className="fa-brands fa-youtube"></i>
                  </a>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>
    </div>





  </>

  );
};

export default Footer;
