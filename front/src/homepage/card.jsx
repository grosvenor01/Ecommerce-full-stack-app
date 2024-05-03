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
  const words = description.split(' ');
  const truncatedDescription = words.slice(0, 4).join(' ');
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
      return response.data.is_in_wishlist;
    } catch (error) {
      console.error('Error checking wishlist:', error);
      throw error;
    }
  }

  useEffect(() => {
    const checkWishlist = async () => {
      const inWishlist = await isProductInWishlist(id);
      setIsInWishlist(inWishlist);
    };

    checkWishlist();
  }, [id]);

  const addToCart = async (productId) => {
    try {
      const data = {
        "product_id": productId,
        "quantity": 1
      };
      const token = localStorage.getItem('token');
      const response = await axios.post('http://127.0.0.1:8000/cart-items/', data, {
        headers: {
          'Authorization': `Token ${token}`
        }
      });
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
            'Authorization': `Token ${localStorage.getItem('token')}`,
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
            'Authorization': `Token ${localStorage.getItem('token')}`,
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

  const heartAnimation = isAnimating ? 'animate-ping duration-500' : '';

  return (
    <Card maxW='250px'>
      <CardBody>
        <Link to={`/products/${id}`}>
          <Image
            src={imageUrl}
            alt={title}
            borderRadius='lg'
            boxSize='200px' // Modify the width and height values as needed
          />
          <Heading fontSize='lg' mt='4' mb='2' isTruncated>
            {title}
          </Heading>
        </Link>
        <Text fontSize='sm' color='gray.500' mb='4' isTruncated>
          {displayDescription}
        </Text>
        <Stack direction='row' align='center' justify='space-between'>
          <Text fontWeight='bold'>{price}</Text>
          <ButtonGroup size='sm' isAttached>
            <Button colorScheme='teal' onClick={() => addToCart(id)}>
              Add to Cart
            </Button>
            <IconButton
              icon={isInWishlist ? <FaHeart className={`text-red-500 ${heartAnimation}`} /> : <FaRegHeart />}
              colorScheme='gray'
              aria-label='Add to wishlist'
              onClick={handleHeartClick}
            />
          </ButtonGroup>
        </Stack>
      </CardBody>
      <CardFooter>
        <Button
          as={Link}
          to={`/products/${id}`}
          colorScheme='teal'
          w='full'
        >
          View Details
        </Button>
      </CardFooter>
    </Card>
  );
};

CustomCard.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
};

export default CustomCard;