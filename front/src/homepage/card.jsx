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
  Image
} from '@chakra-ui/react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useToast } from '@chakra-ui/react'


const CustomCard = ({ imageUrl, title, description, price, id }) => {
  // Split the description into words
  const words = description.split(' ');

  // Take the first four words
  const truncatedDescription = words.slice(0, 4).join(' ');

  // If there are more than four words, add '...' at the end
  const displayDescription =
    words.length > 4 ? truncatedDescription + '...' : truncatedDescription;
    const toast = useToast()




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
  id: PropTypes.string.isRequired,
};

export default CustomCard;
