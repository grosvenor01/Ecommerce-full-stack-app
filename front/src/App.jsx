// import { useState } from 'react'
import './App.css'

// import Product from './product/product'
import Homepage from './homepage/homepage'
import Notfound from "./Notfound/notfound";
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
      
      <Notfound/>
      
    </>
  )
}

export default App
