import React from 'react';
import { Link } from 'react-router-dom';

const CancelPage = () => {
  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>Payment Cancelled</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>
        Your payment was not completed. You can attempt to checkout again or return to your cart to review your items.
      </p>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <Link
          to="/cart"
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#007bff',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Return to Cart
        </Link>
        <Link
          to="/"
          style={{
            margin: '0 10px',
            padding: '10px 20px',
            fontSize: '16px',
            textDecoration: 'none',
            color: '#fff',
            backgroundColor: '#007bff',
            borderRadius: '4px',
            transition: 'background-color 0.3s ease',
          }}
        >
          Home
        </Link>
      </div>
    </div>
  );
};

export default CancelPage;