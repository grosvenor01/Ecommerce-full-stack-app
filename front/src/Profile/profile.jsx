import { Box } from '@chakra-ui/react';
import { Grid, GridItem } from '@chakra-ui/react';
import { useEffect, useRef } from 'react'; // Import useEffect and useRef
import { Link } from 'react-router-dom';
import Dachnav from "./dachnav";
import Cart from "./cart";
import Navbar from '../navbar';

import cart1 from "../assets/dashboerd/cart1.png";
import cart2 from "../assets/dashboerd/cart2.png";
import rating from "../assets/dashboerd/rating.svg";

import React, { useState } from 'react';
import axios from 'axios';


const Profile = () => {
  const token = localStorage.getItem('token');
  const hiddenLinkRef = useRef(null); // Ref for the hidden link
  const [wishlist, setWishlist] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/wishlists/${userId}/`);
        setWishlist(response.data);
      } catch (error) {
        console.error('Error fetching wishlist:', error);
      }
    };

    if (userId) {
      fetchWishlist();
    }
  }, [userId]);

  useEffect(() => {
    if (!token) {
      hiddenLinkRef.current.click();
    }
  }, []); // Empty dependency array to run the effect only once on component mount

  return (
    <Box mt={"2rem"}>
      <Link to="/login" ref={hiddenLinkRef} style={{ display: 'none' }}>Redirecting to login...</Link>
      <Navbar/>
      <Box>
        <Grid
          h='100%'
          templateRows='1fr'
          templateColumns='1fr 3fr'
          gap={4}
        >
          <GridItem display={"flex"} justifyContent={"center"} rowSpan={1} colSpan={1}>
            <Dachnav/>
          </GridItem>
          <GridItem rowSpan={1} colSpan={1}>
            <Grid templateColumns='repeat(2, 1fr)' gap={6}>
              
              <GridItem w='100%' >
                <Cart
                  imageUrl={cart2}
                  title="Simple Headphone"
                  description="Lorem ipsum dolor sit amet"
                  savings="$0.20"
                  price="$1.80"
                  ratingImage={"link"}
                />

              </GridItem>

              <>
  {wishlist.map(wishlistItem => (
    wishlistItem.products.map(product => (
      <GridItem key={product.id} w='100%' > 
        <Cart
          imageUrl={product.photo}
          title={product.title}
          description={product.description}
          price={product.price}
          ratingImage={product.rating}
        />
      </GridItem> 
    ))
  ))}
</>

  





            </Grid>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Profile;
