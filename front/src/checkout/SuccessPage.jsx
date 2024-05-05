import React, { useEffect, useState } from 'react';
import axios from 'axios';

const SuccessPage = () => {
  const [orderStatus, setOrderStatus] = useState({ message: 'Processing...', error: false });

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const params = new URLSearchParams(window.location.search);
      const sessionId = params.get('session_id');
      const token = localStorage.getItem('token');

      if (sessionId) {
        try {
          const response = await axios.get(`http://localhost:8000/success?session_id=${sessionId}`, {
            headers: {
              Authorization: `Token ${token}`
            }
          });
          setOrderStatus({ message: 'Your order has been processed successfully.', error: false });
        } catch (error) {
          const errorMessage = error.response ? error.response.data.error : 'Network error';
          setOrderStatus({ message: `Error processing order: ${errorMessage}`, error: true });
        }
      }
    };

    handlePaymentSuccess();
  }, []);

  const { error, message } = orderStatus;
  const pageTitle = error ? 'Payment Error' : 'Payment Successful';

  return (
    <div style={{ textAlign: 'center', margin: '50px' }}>
      <h1 style={{ fontSize: '28px', marginBottom: '20px' }}>{pageTitle}</h1>
      <p style={{ fontSize: '18px', marginBottom: '30px' }}>{message}</p>
    </div>
  );
};

export default SuccessPage;