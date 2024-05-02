import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment was not completed. You can attempt to checkout again or return to your cart to review your items.</p>
      <Link to="/cart">Return to Cart</Link>
      <Link to="/">Home</Link>
    </div>
  );
};

export default CancelPage;