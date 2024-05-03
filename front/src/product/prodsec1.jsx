import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Box, Image, Text, HStack, useToast, Spinner } from '@chakra-ui/react';
import Navbar from '../navbar';
import circule1 from '../assets/oneproduct/circule1.png';
import circule2 from '../assets/oneproduct/circule2.png';
import circule3 from '../assets/oneproduct/circule3.png';

function Prodsec1() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const toast = useToast();

  const addToCart = async (productId) => {
    try {
      const cartItemData = {
        productId,
        quantity: 1,
      };
      const token = localStorage.getItem('token');
      const addToCartResponse = await axios.post(
        'http://127.0.0.1:8000/cart-items/',
        cartItemData,
        {
          headers: {
            Authorization: `Token ${token}`,
          },
        }
      );
      console.log('Product added to cart:', addToCartResponse.data);
      toast({
        title: 'Product added to cart.',
        description: `Product ${product.title} added to cart`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      });
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <Spinner size="xl" />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Box mt="2rem">
      <Navbar />
      <Box mt="2rem" display="flex" justifyContent="center">
        <Box>
          <Image src={product.photo} width="400px" height="400px" />
        </Box>
        <Box pl="3rem" fontFamily="Poppins, sans-serif">
          <Text fontSize="40px" fontWeight="bold" mb="1rem">
            {product.title}
          </Text>
          <Text fontSize="22px" color="#9F9F9F" mb="1rem">
            {product.price}
          </Text>
          <Text color="#E8E8E8" fontSize="12px" mb="2rem">
            {product.description}
          </Text>
          <Text fontSize="13px" color="#9F9F9F" mb="0.5rem">
            Color
          </Text>
          <HStack mb="2rem">
            <Image src={circule1} width="30px" height="30px" mr="5px" />
            <Image src={circule2} width="30px" height="30px" mr="5px" />
            <Image src={circule3} width="30px" height="30px" mr="5px" />
          </HStack>
          <HStack>
            <Box
              onClick={() => addToCart(id)}
              className="navlogohover spesial-button"
              border="1px solid #E8E8E8"
              padding="1rem 2rem"
              borderRadius="13px"
              mr="1rem"
              cursor="pointer"
            >
              Add to cart
            </Box>
          </HStack>
        </Box>
      </Box>
    </Box>
  );
}

export default Prodsec1;