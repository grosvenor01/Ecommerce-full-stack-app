// import { useState } from 'react'
import './App.css'

// import Product from './product/product'
import Homepage from './homepage/homepage'
import Profile from "./Profile/profile";
import Login from "./Login/login";
import Register from "./register/register";
import Notfound from "./Notfound/notfound";
import Product from "./product/product";







import  {  useEffect } from 'react';




const App = () =>{
  
  const checkThemeInLocalStorage = () => {
      localStorage.setItem('chakra-ui-color-mode', 'dark');
    };
  useEffect(() => {
    checkThemeInLocalStorage();
  }, []);



  return (
    <>
    {/* <Profile/> */}
    <Homepage/>
    {/* <Login/> */}
    {/* <Register/> */}
    {/* <Register/> */}
    {/* <Notfound/> */}
    {/* <Product/> */}
      
     
      
    </>
  )
}

export default App
