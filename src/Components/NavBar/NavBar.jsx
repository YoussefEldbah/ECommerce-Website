import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import logo from '../../Assets/images/freshcart-logo.svg'
import { useContext } from 'react';
import { TokenContext } from '../../Context/Token';

const NavBar = () => {
  let { token, setToken } = useContext(TokenContext)
  let navigate = useNavigate()

  function LogOut() {
    localStorage.removeItem("userToken")
    setToken(null)
    navigate("/login")
  }
  return (<>

    <nav className='fixed-top  navbar navbar-expand-lg bg-body-tertiary '>
      <div className="container ">
        <NavLink className="navbar-brand bg-transparent" to={'home'}>
          <img src={logo} alt="" />
        </NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse  navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav  me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link" activeClassName="active" aria-current="page" to={'home'}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " activeClassName="active" to={'products'}>Products</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " activeClassName="active" to={'categories'}>Categories</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " activeClassName="active" to={'brands'}>Brands</NavLink>
            </li>
            {token ? <>
            <li className="nav-item">
              <NavLink className="nav-link  " activeClassName="active" to={'cart'}>Cart</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " activeClassName="active" to={'wishlist'}>Wishlist</NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link " activeClassName="active" to={'allorders'}>Orders</NavLink>
            </li>
            </> : null}
          </ul>

          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

            {token ? <>
              <li className="nav-item">
              <NavLink to={'profile'} className="nav-link me-1 " activeClassName="active" ><i className="fa-solid fs-5  me-2 fa-user"></i>Profile</NavLink>
            </li>
              <li className="nav-item">
              <button className="nav-link " onClick={LogOut}>LogOut<i className="fa-solid ms-2 fa-right-from-bracket"></i></button>
            </li>
             
              </>:

              <>
                <li className="nav-item">
                  <NavLink className="nav-link me-1" activeClassName="active" to={'login'}>login</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link  me-1" activeClassName="active" to={'register'}>register</NavLink>
                </li></>}

            </ul>
        </div>
      </div>
    </nav>
  </>)
};

export default NavBar;
 