import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import './index.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js'


import App from './App';
import reportWebVitals from './reportWebVitals';
import CounterContextProvider from './Context/counterContext';
import TokenContextProvider from './Context/Token';
import { QueryClient, QueryClientProvider } from 'react-query';
import CartContextProvider from './Context/cartContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
let query=new QueryClient()
root.render(
  <CartContextProvider>
  <QueryClientProvider client={query}>
 {/* <React.StrictMode> */}
    <CounterContextProvider>
      <TokenContextProvider>
      <App/>
      </TokenContextProvider>
     
      </CounterContextProvider>
   
  {/* </React.StrictMode> */}
  </QueryClientProvider>
  </CartContextProvider>

 
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
