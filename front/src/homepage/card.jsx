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


const CustomCard = ({ imageUrl, title, description, price, id }) => {
  // Split the description into words
  const words = description.split(' ');

  // Take the first four words
  const truncatedDescription = words.slice(0, 4).join(' ');

  // If there are more than four words, add '...' at the end
  const displayDescription =
    words.length > 4 ? truncatedDescription + '...' : truncatedDescription;

  // const handleAddToCart = () => {
  //   const token = localStorage.getItem('token');
  //   if (!token) {
  //     alert('You are not logged in. Please log in to add items to the cart.');
  //   } else {
  //     console.log('Item added to the cart:', title);
  //   }
  // };



  const addToCart = async () => {
    try {
      const data = {
        "products_id": 20   // here we give the product id to add , delete to the wishlist of a user 
    }
      const response = await axios.get('http://127.0.0.1:8000/wishlists/12/',data);
      console.log(response.data); // Print the response data
    } catch (error) {
      console.error('Error:', error);
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
          <Link to={`/buy/${id}`}>
            <Button variant='solid' colorScheme='blue' onClick={() => console.log("Buy now clicked")}>
              Buy now
            </Button>
          </Link>
          <Button variant='ghost' colorScheme='blue' onClick={addToCart}>
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
