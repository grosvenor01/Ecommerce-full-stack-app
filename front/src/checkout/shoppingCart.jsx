import React, { useEffect, useState } from 'react';
import { Box, Heading, HStack, VStack, Button, StackDivider, Image, Text, Input, IconButton, Flex } from '@chakra-ui/react';
import Banner from '../assets/cart/ff74c027a1888544144abe4be6e02cbf.jfif'
import ArrowBanner from '../assets/cart/arrow-banner.png'
import Navbar from '../navbar';
import { CloseIcon, DeleteIcon } from '@chakra-ui/icons';
import axios from 'axios';

const ShoppingCart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const token = localStorage.getItem('token');
    const stripe = window.Stripe('pk_test_51NVH0wGt8K1SPn6ZUjneBpALJjoSPmoklMeFOKf76Tul5iVQMmFO8ovLtSpwEzEThwUb5zNc3q9t3ZuMFx8rdAQM00AP7F4DtS');

    const fetchCartItems = async () => {
        try {
            const response = await axios.get('http://127.0.0.1:8000/cart/', {
                headers: { 'Authorization': `Token ${token}` }
            });
            setCartItems(response.data.items);
            setTotalPrice(response.data.total_price);
        } catch (error) {
            console.error('Error fetching cart items:', error);
        }
    };
    useEffect(() => {
        fetchCartItems();
    }, []);

    // const handleQuantityChange = (id, newQuantity) => {
    //     const updatedItems = cartItems.map(item => 
    //         item.id === id ? { ...item, quantity: newQuantity } : item
    //     );
    //     setCartItems(updatedItems);
    // };

    const updateQuantity = async (id, qty) => {
        try {
            // const item = cartItems.find(item => item.id === id);
            await axios.put(`http://127.0.0.1:8000/cart-items/${id}/`, {
                quantity: qty
            }, {
                headers: { 'Authorization': `Token ${token}` }
            });
            console.log('Quantity updated');
            fetchCartItems();
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    const deleteItem = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/cart-items/${id}/delete/`, {
                headers: { 'Authorization': `Token ${token}` }
            });
            const updatedItems = cartItems.filter(item => item.id !== id);
            setCartItems(updatedItems);
            console.log('Item deleted');
            fetchCartItems();
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    const handleCheckout = async () => {
        try {
            const response = await axios.post('http://127.0.0.1:8000/stripe/', {}, {
                headers: {
                    Authorization: `Token ${token}`
                }
            });
            if (response.data.checkout_url) {
                window.location.href = response.data.checkout_url; // Redirects the user to Stripe's checkout
            } else {
                throw new Error('No checkout URL received.');
            }
        } catch (error) {
            console.error('Error initiating Stripe checkout:', error);
            alert('There was an error processing your checkout. Please try again.');
        }
    };

    const total = cartItems.reduce((acc, item) => acc + (item.quantity * item.product.price), 0);

    return (<>
        <Box position="relative" height="316px" display="flex" flexDirection={"column"} >
            {/* Background Layer */}
            <Box
                position="absolute"
                top={0}
                left={0}
                right={0}
                bottom={0}
                bgImage={`url(${Banner})`}
                bgSize="cover"
                bgPosition="center"
                opacity="0.5" // Set the opacity of the background image
                zIndex={-1} // Ensure the background layer is behind the content

            ></Box>

            {/* Foreground Content */}
            <Box position="relative" display="flex" flexDirection="column" alignItems="center" justifyContent="space-around" zIndex={1} height={"100%"} padding={"0 2rem"}>
                {/* Content goes here. It won't be affected by the opacity of the background. */}
                <Navbar />
                <Box>
                    <img src={ArrowBanner} alt="arrow" height={77} width={77} />
                    <Heading as="h2" size="2xl" color="white" textAlign="center">
                        Cart
                    </Heading>
                    <p>Home{">"}Cart</p>
                </Box>
            </Box>
        </Box>
        <Box display={"flex"} alignItems={"center"} justifyContent={"center"} height={"525px"}>
            <HStack height={"400px"} width={"85%"} gap={"30px"}>
                <VStack
                    divider={<StackDivider borderColor="gray.600" />}
                    spacing={4}
                    align="stretch"
                    w="full"
                >
                    {/* Headers */}
                    <HStack spacing={10} px={4} pt={4} pb={2}>
                        <Box flex="2">Product</Box>
                        <Box flex="1">Price</Box>
                        <Box flex="1">Quantity</Box>
                        <Box flex="1">Subtotal</Box>
                        <Box flex="0">Delete</Box>
                    </HStack>

                    <Box maxHeight="300px" overflowY="auto">
                        <VStack spacing={4} divider={<StackDivider borderColor="gray.600" />}>
                            {cartItems.map((item) => (
                                <Flex key={item.id} align="center" justify="space-between" width="100%">
                                    <Box flexBasis="50%" display="flex" alignItems="center">
                                        <Image boxSize="50px" src={item.product.photo} alt={item.product.title} mr={4} />
                                        <Text>{item.product.title}</Text>
                                    </Box>
                                    <Text flexBasis="15%">${item.product.price.toFixed(2)}</Text>
                                    <Input
                                        flexBasis="15%"
                                        type="number"
                                        defaultValue={item.quantity}
                                        size="sm"
                                        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                                    />
                                    <Text flexBasis="15%">${(item.product.price * item.quantity).toFixed(2)}</Text>
                                    <IconButton
                                        aria-label="Delete item"
                                        icon={<CloseIcon />}
                                        onClick={() => deleteItem(item.id)}
                                        size="sm"
                                        variant="ghost"
                                        flexBasis="5%"
                                    />
                                </Flex>
                            ))}
                        </VStack>
                    </Box>
                </VStack>
                <Box width={"25%"} bg={"#272727"} height={"100%"} display={"flex"} alignItems={"center"} flexDirection={"column"}>
                    <Heading as="h3" size="lg" pt={"15px"} lineHeight={"48px"} color={"#DEDEDE"}>
                        Cart Totals
                    </Heading>
                    <HStack width={"80%"} justifyContent={"space-around"} mt={"60px"}>
                        <Heading as="h5" size="sm" color={"#DEDEDE"} lineHeight={"24px"}>
                            Subtotal
                        </Heading>
                        <Heading as="h5" size="sm" color={"#9F9F9F"} lineHeight={"24px"}>
                            {total.toFixed(2)}
                        </Heading>
                    </HStack>
                    <HStack width={"80%"} justifyContent={"space-around"} mt={"20px"}>
                        <Heading as="h5" size="sm" color={"#DEDEDE"} lineHeight={"24px"}>
                            Total
                        </Heading>
                        <Heading as="h5" size="md" color={"#B88E2F"} lineHeight={"30px"}>
                            {totalPrice}
                        </Heading>
                    </HStack>
                    <Button
                        bgColor={"#272727"}
                        mt={"50px"}
                        borderRadius={"15px"}
                        border={"1px"}
                        padding={"20px 100px"}
                        fontFamily={"Poppins"}
                        lineHeight={"30px"}
                        size={"20px"}
                        fontWeight={"400"}
                        onClick={handleCheckout}>
                        Check Out
                    </Button>
                </Box>
            </HStack>
        </Box>
        <Box
            width="100%"
            bgColor="#282828"
            height={{ base: "80px", md: "200px", lg: "50px" }}
            mt={{ base: "20px", md: "30px", lg: "20px" }}
            display="flex"
            flexDirection={{ base: "column", md: "row" }}
            alignItems={{ base: "center", md: "flex-start" }}
            justifyContent={{ base: "space-around", md: "flex-start", lg: "space-around" }}
        >
            {/* Footer */}
            <Image src="src/assets/cart/Frame 5.svg" height={{ base: "10px", md: "10px", lg: "40px" }} mb={{ base: "10px", md: 0 }}></Image>
            <Image src="src/assets/cart/Frame 19.svg" height={{ base: "10px", md: "80px", lg: "40px" }} mb={{ base: "10px", md: 0 }}></Image>
            <Image src="src/assets/cart/Frame 2.svg" height={{ base: "10px", md: "80px", lg: "40px" }} mb={{ base: "10px", md: 0 }}></Image>
            <Image src="src/assets/cart/Frame 4.svg" height={{ base: "10px", md: "80px", lg: "40px" }} mb={{ base: "10px", md: 0 }}></Image>
        </Box>
    </>
    );
};

export default ShoppingCart;