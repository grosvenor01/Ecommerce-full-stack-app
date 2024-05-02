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
          setOrderStatus({ message: 'Error processing order: ' + (error.response ? error.response.data.error : 'Network error'), error: true });
        }
      }
    };

    handlePaymentSuccess();
  }, []);

  return (
    <div>
      <h1>{orderStatus.error ? "Payment Error" : "Payment Successful"}</h1>
      <p>{orderStatus.message}</p>
    </div>
  );
};

export default SuccessPage;