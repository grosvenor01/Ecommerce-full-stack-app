import { Link } from 'react-router-dom';
import {
  Card,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
  Image,
  IconButton
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';


const CustomCard = ({ imageUrl, title, description, price, id }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  // Split the description into words
  const words = description.split(' ');

  // Take the first four words
  const truncatedDescription = words.slice(0, 4).join(' ');

  // If there are more than four words, add '...' at the end
  const displayDescription =
    words.length > 4 ? truncatedDescription + '...' : truncatedDescription;
    const toast = useToast()

    const isProductInWishlist = async (productId) => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://127.0.0.1:8000/wishlists/check/${productId}/`, {
          headers: {
            'Authorization': `Token ${token}`,
          },
        });
        console.log(response.data)
        return response.data.is_in_wishlist;
      } catch (error) {
        console.error('Error checking wishlist:', error);
        throw error;
      }
    }
    useEffect(() => {
      const checkWishlist = async () => {
        const inWishlist = await isProductInWishlist(id);
        console.log(inWishlist);
        setIsInWishlist(inWishlist);
      };
  
      checkWishlist();
    }, [id]);

  const addToCart = async (productId) => {
    try {
      const data = {
        "product_id": productId, // Dynamic product ID to add
        "quantity": 1  // Assuming a default quantity of 1
      };
      const token = localStorage.getItem('token'); // Get auth token from storage
      console.log('Token:', token); // Print the token
      const response = await axios.post('http://127.0.0.1:8000/cart-items/', data, {
        headers: {
          'Authorization': `Token ${token}` // Ensure requests are authenticated
        }
      });
      console.log('Product added to cart:', response.data); // Print the response data
      toast({
        title: 'Product added to cart.',
        description: `product ${title} added to cart`,
        status: 'success',
        duration: 4000,
        isClosable: true,
      })
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  const addToWishlist = async (productId) => {
    try {
      setIsAnimating(true);
      const response = await axios.post(`http://127.0.0.1:8000/wishlist/`, {
        product_id: productId,
      },
    {
      headers: {
        'Authorization': `Token ${localStorage.getItem('token')}`, // Ensure requests are authenticated
        'Content-Type': 'application/json'
      }
    }
    );
      setIsInWishlist(true);
      toast({
        title: 'Success',
        description: 'Added to wishlist!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to add to wishlist: ${error.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsAnimating(false);
    }
  };

  const removeFromWishlist = async (productId) => {
    try {
      setIsAnimating(true);
      const response = await axios.delete(`http://127.0.0.1:8000/wishlist/?product_id=${productId}`,
      {
        headers: {
          'Authorization': `Token ${localStorage.getItem('token')}`, // Ensure requests are authenticated
          'Content-Type': 'application/json'
        }
      }
    );
      setIsInWishlist(false);
      toast({
        title: 'Success',
        description: 'Removed from wishlist!',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to remove from wishlist: ${error.response.data.message}`,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsAnimating(false);
    }
  };


  const handleHeartClick = () => {
    if (isInWishlist) {
      removeFromWishlist(id);
    } else {
      addToWishlist(id);
    }
  };

  // Add this CSS for the heart animation
  const heartAnimation = isAnimating
    ? 'animate-ping duration-500'
    : '';

  return (
    <Card maxW='250px'>
      <CardBody>
        <Link to={`/products/${id}`}>
          <Image
            src={imageUrl}
            alt={title}
            borderRadius='lg'
          />
          <Stack mt='6' spacing='3'>
            <Heading size='md'>{title}</Heading>
            <Text>{displayDescription}</Text>
            <Text color='blue.600' fontSize='2xl'>
              ${price}
            </Text>
          </Stack>
        </Link>
      </CardBody>
      <CardFooter padding='0rem 0px 1rem 0rem' margin='0 auto'>
        <ButtonGroup spacing='2'>
          {/* <Link to={`/buy/${id}`}>
            <Button variant='solid' colorScheme='blue' onClick={() => console.log("Buy now clicked")}>
              Buy now
            </Button>
          </Link> */}
          <Button variant='ghost' colorScheme='blue' onClick={() => addToCart(id)}>
            Add to cart
          </Button>
          <IconButton
            aria-label='Add to wishlist'
            icon={isInWishlist ? <FaHeart className={heartAnimation} /> : <FaRegHeart />}
            onClick={handleHeartClick}
          />
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

CustomCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired, // Changed from array to string
  price: PropTypes.number.isRequired,
  id: PropTypes.number.isRequired,
};

export default CustomCard;
