import { useState } from 'react'
import './App.css'

import Product from './product/product'
import Homepage from './homepage/homepage'
import React, {  useEffect } from 'react';

const App = () =>{
  
  const [theme, setTheme] = useState('');
  const checkThemeInLocalStorage = () => {
    const savedTheme = localStorage.getItem('chakra-ui-color-mode');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      // If theme is not found in localStorage, set it to 'dark'
      localStorage.setItem('chakra-ui-color-mode', 'dark');
      setTheme('dark');
    }
  };
  useEffect(() => {
    checkThemeInLocalStorage();
  }, []);



  return (
    <>
      
      <Product/>
      
    </>
  )
}

export default App
