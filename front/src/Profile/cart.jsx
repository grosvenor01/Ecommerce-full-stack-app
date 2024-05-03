import PropTypes from 'prop-types';
import { Box, Image, Text } from '@chakra-ui/react';
import ratingImage2 from "../assets/dashboerd/rating.svg";
import { useToast } from '@chakra-ui/react'
import axios from 'axios';



const Cart = ({ id, imageUrl, title, description, savings, price }) => {

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
            description: `product  ${title} added to cart`,
            status: 'success',
            duration: 4000,
            isClosable: true,
          })
        } catch (error) {
          console.error('Error adding product to cart:', error);
        }
      };  
    


    return (
        <Box p={"1rem"} mt={"2rem"} width={"433px"} bg={"#242424"} display={"flex"}>
            <Image width={"142px"} src={imageUrl} />
            <Box ml={"1rem"}>
                <Text mb={"0.3rem"} fontSize={"20px"} fontWeight={"bold"}>{title}</Text>
                <Text mb={0} fontSize={"18px"}>{description}</Text>
                <Text mb={"0.2rem"} fontSize={"18px"} color={"#7B61FF"}>You save {savings}</Text>
                <Text mb={"0.3rem"} fontSize={"20"} fontWeight={"bold"}>{price}</Text>
                <Image h={"1rem"} src={ratingImage2} />
                <Text className='navlogohover' onClick={() => addToCart(id)} mb={"0.2rem"} fontSize={"18px"}  >add to chart {savings}</Text>
            </Box>
        </Box>
    );
};

Cart.propTypes = {
  id: PropTypes.number.isRequired,
  imageUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  savings: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  ratingImage: PropTypes.string.isRequired,
};

export default Cart;
