import { Link } from 'react-router-dom';

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

const CustomCard = ({ imageUrl, title, description, price,id }) => {
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
        <Link to={`/buy/${id}`}> 
          <Button variant='solid' colorScheme='blue' onClick={() => console.log("Buy now clicked")}>
            Buy now
          </Button>
          </Link>
          <Link to={`/cart/${id}`}> 
          <Button variant='ghost' colorScheme='blue' onClick={() => console.log("Add to cart clicked")}>
            Add to cart
          </Button>
          </Link>
        </ButtonGroup>
      </CardFooter>
    </Card>
  );
};

export default CustomCard;
