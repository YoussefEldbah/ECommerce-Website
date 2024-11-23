import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Components/Home/Home'
import Brands from './Components/Brands/Brands'
import Cart from './Components/Cart/Cart'
import Categories from './Components/Categories/Categories'
import Products from './Components/Products/Products'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'
import NotFound from './Components/NotFound/NotFound'
import LayOut from './Components/LayOut/LayOut';
import WishList from './Components/WishList/WishList';
import LogOut from './Components/LogOut/LogOut';
import { TokenContext } from './Context/Token';
import { useContext, useEffect } from 'react';
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes';
import ProtectedRoutesX from './Components/ProtectedRoutesX/ProtectedRoutesX';
import Details from './Components/Details/Details';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import Profile from './Components/Profile/Profile';
import UpdateDate from './Components/UpdateDate/UpdateDate';
import UpdatePassword from './Components/UpdatePassword/UpdatePassword';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';



function App() {
  let { setToken } = useContext(TokenContext)
  const routes = createBrowserRouter([
    {
      path: "", element: <LayOut />, children: [
        { path: "/", element:<ProtectedRoutes><Home /></ProtectedRoutes>  },

        { path: "home", element: <ProtectedRoutes>     <Home />    </ProtectedRoutes> },
        { path: "brands", element: <ProtectedRoutes>   <Brands />     </ProtectedRoutes> },
        { path: "cart", element: <ProtectedRoutes>      <Cart />          </ProtectedRoutes> },
        { path: "categories", element: <ProtectedRoutes>   <Categories />   </ProtectedRoutes> },
        { path: "products", element: <ProtectedRoutes>    <Products />         </ProtectedRoutes> },
        { path: "details/:id", element: <ProtectedRoutes>    <Details/>         </ProtectedRoutes> },
        { path: "wishlist", element: <ProtectedRoutes>   <WishList />          </ProtectedRoutes> },
        { path: "checkout", element: <ProtectedRoutes>   <CheckOut />          </ProtectedRoutes> },
        { path: "allorders", element: <ProtectedRoutes>   < AllOrders/>          </ProtectedRoutes> },
        { path: "profile", element: <ProtectedRoutes>   < Profile/>          </ProtectedRoutes> },
        { path: "updatedate", element: <ProtectedRoutes>   < UpdateDate/>          </ProtectedRoutes> },
        { path: "updatepassword", element: <ProtectedRoutes>   < UpdatePassword/>          </ProtectedRoutes> },
        { path: "login", element: <Login /> },
        { path: "resetpassword", element: < ResetPassword/> },
        { path: "forgetpassword", element: <ForgetPassword /> },
        { path: "register", element:  <Register />},
        { path: "logout", element:  <LogOut />},
        { path: "*", element: <NotFound />  }

      ]
    }
  ])
  useEffect(() => {
    if (localStorage.getItem("userToken") != null) {
      setToken(localStorage.getItem("userToken"))
    }
  }, [])
  return (
    <RouterProvider router={routes}></RouterProvider>


  );
}

export default App;
