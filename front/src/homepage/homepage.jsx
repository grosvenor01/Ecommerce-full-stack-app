import { Grid, GridItem, Text } from '@chakra-ui/react';
import Filter from './filter';
import Tropy from '../assets/sidebar/trophy.svg';
import Stats from '../assets/sidebar/stats.svg';
import Coron from '../assets/sidebar/coron.svg';
import Lectro from '../assets/sidebar/lectro.svg';
import Fashen from '../assets/sidebar/fashen.svg';
import Cuisin from '../assets/sidebar/cuisin.svg';
import CustomCard from './card';
import Pagination from './pagination';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Box, Image, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import { SearchIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react';
import Cart from '../assets/cart.svg';
import Points from '../assets/points.svg';
import Racklogo from '../assets/Racklogo.svg';
import Profile from '../assets/profile.svg';
import Heart from '../assets/heart.svg';
import CardSkeleton from './CardSkeleton';
const Homepage = () => {
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoaded, setisLoaded] = useState(true);
  const perPage = 20;
  const skeletonslist = [1, 2, 3, 4,5,6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20];

  const handleInputChange = async (event) => {
    const text = event.target.value;
    setSearchText(text);
    try {
      const response = await axios.post('http://127.0.0.1:8000/search/', { Text: text });
      setProducts(response.data);
      console.log(response.data); // Print the response data
      setProducts(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products/');
        setProducts(response.data);
        setisLoaded(false);

      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('patata patata');
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <Grid
        mb={'1rem'}
        templateAreas={`
          "nav nav"
          "header header"
          "navi main"
          "navi footer"
        `}
        gridTemplateRows={'70px 70px 1fr 50px'}
        gridTemplateColumns={'220px 1fr'}
        h='100rem'
        gap='1'
        fontWeight='regular'
        fontFamily={'Poppins , sans-serif'}
        padding={'0 2rem'}
      >
        <GridItem display='flex' area='nav' justifyContent='center' alignItems='center'>
          <Box boxSize='lr' width='100%'>
            <HStack spacing='24px'>
              <Link to='/'>
                <Image className='navlogohover' src={Racklogo} alt='Rack logo' />
              </Link>
              <InputGroup bg='' width='75%' alignItems='center' onChange={handleInputChange}>
                <InputLeftElement pointerEvents='none'>
                  <SearchIcon mt='10px' color='white' />
                </InputLeftElement>
                <Input
                  height='3rem'
                  borderRadius='20px'
                  type='text'
                  placeholder='Search product'
                  value={searchText}
                />
              </InputGroup>
              <HStack spacing='24px'>
                <Link to='/profile'>
                  <Image className='navimghover' src={Profile} alt='Profile' />
                </Link>
                <Link to='/favorits'>
                  <Image className='navimghover' src={Heart} alt='Favorites' />
                </Link>
                <Link to='/cart'>
                  <Image className='navimghover' src={Cart} alt='Cart' />
                </Link>
                <Link to='/points'>
                  <Image className='navimghover' src={Points} alt='Points' />
                </Link>
              </HStack>
            </HStack>
          </Box>
        </GridItem>

        <GridItem display='flex' alignItems='center' pl='60' area='header' fontSize='48px' fontWeight='bold'>
          Discover Most Suitable products
        </GridItem>

   

        <GridItem pl='2' area='navi'>
          <Text className='sidecursorpoint' mb='2rem' fontSize='24px' fontWeight='bold'>
            Home
          </Text>
          <Text className='sidecursorpoint' fontSize='24px' fontWeight='bold'>
            Top
          </Text>
          <Filter imageUrl={Tropy} text='Best of the year' />
          <Filter imageUrl={Stats} text='Popular in 2024' />
          <Filter imageUrl={Coron} text='COVID Essentials' />
          <Filter imageUrl={Lectro} text='Electronics' />
          <Filter imageUrl={Fashen} text='Fashion' />
          <Filter imageUrl={Cuisin} text='Kitchen' />
        </GridItem>

        <GridItem display='flex' area='main' justifyContent='center' alignItems='center'>
          <Grid
            templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)', 'repeat(4, 1fr)']}
            gap={6}
            width='100%'
          >
           {isLoaded ? (
  skeletonslist.map((Skeleton) => (
    <GridItem key={Skeleton} rowSpan={2} colSpan={1} style={{ display: 'flex', alignItems: 'stretch' }}>
      <CardSkeleton/>
    </GridItem>
  ))
) : (
  products.slice((currentPage - 1) * perPage, currentPage * perPage).map(product => (
    <GridItem key={product.id} rowSpan={2} colSpan={1} style={{ display: 'flex', alignItems: 'stretch' }}>
      <CustomCard
        id={product.id}
        imageUrl={product.photo}
        title={product.title}
        description={product.description}
        price={product.price}
        style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', height: '100%' }}
      />
    </GridItem>
  ))
)}



          </Grid>
        </GridItem>

        <GridItem pl='2' area='footer'>
          <Pagination
            nPages={Math.ceil(products.length / perPage)}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </GridItem>
      </Grid>
    </>
  );
};

export default Homepage;