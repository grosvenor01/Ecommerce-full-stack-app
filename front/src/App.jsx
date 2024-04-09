
import  { useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Homepage from './homepage/homepage';
import Profile from './Profile/profile';
import Login from './Login/login';
import Register from './register/register';
import Notfound from './Notfound/notfound';
import Product from './product/product';

const App = () => {
  const checkThemeInLocalStorage = () => {
    localStorage.setItem('chakra-ui-color-mode', 'dark');
  };
  useEffect(() => {
    checkThemeInLocalStorage();
  }, []);

  return (
    <Router>
      <Routes>
        {/* Routes for various pages */}
        <Route path="/" exact element={<Homepage />} />
        <Route path="/products/:id" element={<Product />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/favorits" element={<Profile />} />
        {/* Catch-all route for unmatched paths */}
        <Route path="*" element={<Notfound />} />
      </Routes>
    </Router>
  );
};

export default App;
