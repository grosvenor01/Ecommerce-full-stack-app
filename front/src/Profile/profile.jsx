import React, { useEffect, useState } from 'react';
import { Box, Grid, Text, VStack, Image, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../navbar';
import Dachnav from './dachnav';
import axios from 'axios';

const UserProfile = ({ user }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
    <Text fontSize="2xl" fontWeight="bold">User Profile</Text>
    <Text mt="4">Username: {user.username}</Text>
    <Text>Email: {user.email}</Text>
    <Text>Date Joined: {new Date(user.date_joined).toLocaleDateString()}</Text>
  </Box>
);

const Orders = ({ orders }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
    <Text fontSize="2xl" fontWeight="bold">Orders</Text>
    {orders.map(order => (
      <Box key={order.id} p="4" borderWidth="1px" borderRadius="lg" mt="4">
        <Text fontWeight="bold">Order ID: {order.id}</Text>
        <Text>Total Price: ${order.total_price}</Text>
        <Text>Status: {order.state}</Text>
        <VStack align="start" spacing={2}>
          {order.products.map(product => (
            <Text key={product.id}>Product ID: {product.product}, Quantity: {product.quantity}</Text>
          ))}
        </VStack>
      </Box>
    ))}
  </Box>
);

const WishlistItems = ({ wishlist }) => (
  <Box borderWidth="1px" borderRadius="lg" overflow="hidden" p="6">
    <Text fontSize="2xl" fontWeight="bold">Wishlist</Text>
    <VStack spacing={4}>
      {wishlist.products.map(item => (
        <Box key={item.id} p="4" borderWidth="1px" borderRadius="lg">
          <Image src={item.photo} alt={item.title} boxSize="100px" objectFit="cover" />
          <Text fontWeight="bold">{item.title}</Text>
          <Text>Description: {item.description}</Text>
          <Text>Price: ${item.price}</Text>
          <Text>Rating: {item.rating} / 5</Text>
        </Box>
      ))}
    </VStack>
  </Box>
);

const Profile = () => {
  const [activeSection, setActiveSection] = useState('profile');
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    if (!token) {
      setLoading(false);
      navigate('/login', { replace: true }); // Use navigate to redirect
      return;
    }
    
    const fetchData = async () => {
      try {
        const [userResponse, wishlistResponse, ordersResponse] = await Promise.all([
          axios.get(`http://127.0.0.1:8000/users/${userId}`, { headers: { 'Authorization': `Token ${token}` } }),
          axios.get(`http://127.0.0.1:8000/wishlist/`, { headers: { 'Authorization': `Token ${token}` } }),
          axios.get(`http://127.0.0.1:8000/orders/`, { headers: { 'Authorization': `Token ${token}` } })
        ]);
        setUser(userResponse.data[0]);
        setWishlist(wishlistResponse.data[0]);
        setOrders(ordersResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
        console.error('Error fetching data:', error);
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('token'); // Clear token if it's expired or invalid
          navigate('/login', { replace: true }); // Redirect to login
          return;
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [userId, token, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    // Ideally redirect or force a re-render to the login page
  };

  if (loading) {
    return <Spinner size="xl" />;
  }

  return (
    <Box mt="2rem" padding="0 2rem">
      <Navbar />
      <Grid templateColumns="300px 1fr" gap="4" mt="2rem">
        <Dachnav activeSection={activeSection} setActiveSection={setActiveSection} handleLogout={handleLogout} />
        <Box pl="5">
          {activeSection === 'profile' && <UserProfile user={user} />}
          {activeSection === 'orders' && <Orders orders={orders} />}
          {activeSection === 'wishlist' && <WishlistItems wishlist={wishlist} />}
        </Box>
      </Grid>
    </Box>
  );
};

export default Profile;
