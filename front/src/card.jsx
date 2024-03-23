// import React from 'react'
// import { Card, CardHeader, CardBody, CardFooter } from '@chakra-ui/react'
// // import Heading from chakra
// import { Heading,StackDivider,Stack,Box,Text } from '@chakra-ui/react'
// import { Button, ButtonGroup } from '@chakra-ui/react'
// import { Image } from '@chakra-ui/react'
// import  product1  from "./assets/products/product1.png";
// import  product2  from "./assets/products/product2.png";
// import  product3  from "./assets/products/product3.png";
// import  product4  from "./assets/products/product4.webp";
// const Cardl = () => {
//   return (
//     <>
    
//     <Card maxW='250px' >
//   <CardBody>
//     <Image
//       src='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
//       // src={product1}
//       alt='Green double couch with wooden legs'
//       borderRadius='lg'
//     />
//     <Stack mt='6' spacing='3'>
//       <Heading size='md'>Living room Sofa</Heading>
//       <Text>
//         This sofa is perfect for modern tropical spaces, baroque inspired
//         spaces, 
//       </Text>

//       <Text color='blue.600' fontSize='2xl'>
//         $450
//       </Text>

//     </Stack>
//   </CardBody>
//   {/* <Divider /> */}
//   <CardFooter  padding={"0rem 0px 1rem 0rem"} margin={"0 auto"}>
//     <ButtonGroup spacing='2'>
//       <Button variant='solid' colorScheme='blue' onClick={()=>console.log("hello")}>
//         Buy now
//       </Button>
//       <Button variant='ghost' colorScheme='blue' onClick={()=>console.log("hello")}>
//         Add to cart
//       </Button>
//     </ButtonGroup>
//   </CardFooter>
// </Card>


    
    
//     </>
//   )
// }

// export default Cardl



import React from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Stack,
  Text,
  Button,
  ButtonGroup,
  Image
} from '@chakra-ui/react';

const CustomCard = ({ imageUrl, title, description, price }) => {
  return (
    <Card maxW='250px'>
      <CardBody>
        <Image
          src={imageUrl}
          alt={title}
          borderRadius='lg'
        />
        <Stack mt='6' spacing='3'>
          <Heading size='md'>{title}</Heading>
          <Text>{description}</Text>
          <Text color='blue.600' fontSize='2xl'>
            ${price}
          </Text>
        </Stack>
      </CardBody>
      <CardFooter padding='0rem 0px 1rem 0rem' margin='0 auto'>
        <ButtonGroup spacing='2'>
          <Button variant='solid' colorScheme='blue' onClick={() => console.log("Buy now clicked")}>
            Buy now
          </Button>
          <Button variant='ghost' colorScheme='blue' onClick={() => console.log("Add to cart clicked")}>
            Add to cart
          </Button>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
