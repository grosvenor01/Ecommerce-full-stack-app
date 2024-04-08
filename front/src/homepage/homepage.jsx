import { Grid, GridItem,Text } from '@chakra-ui/react'
import Filter from './filter'
import Tropy from '../assets/sidebar/trophy.svg'
import Stats from '../assets/sidebar/stats.svg'
import Coron from '../assets/sidebar/coron.svg'
import Lectro from '../assets/sidebar/lectro.svg'
import Fashen from '../assets/sidebar/fashen.svg'
import Cuisin from '../assets/sidebar/cuisin.svg'
import { Link } from 'react-router-dom';
import CustomCard from './card'
import Navbar from '../navbar'
import Pagination from './pagination'

import axios from 'axios'
import { useEffect, useState } from 'react'






const Homepage = () => {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get('http://127.0.0.1:8000/products/');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('patata patata');
      }
    }

    fetchProducts();
  }, []);
  

  return (
    <>
    <Grid  mb={"1rem"} 
  templateAreas={`
  "nav nav"
  "header header"
                  "navi main"
                  "navi footer"`}
  gridTemplateRows={'70px 70px 1fr 50px'}
  gridTemplateColumns={'220px 1fr'}
  h='100rem'
  gap='1'
  fontWeight='regular'
//   fontFamily={"serif"}
  fontFamily={"Poppins , sans-serif"}
//   fontWeight={"900"}

>
<GridItem display={"flex"}  area={'nav'} justifyContent={"center"} alignItems={"center"} >
    <Navbar/>
  </GridItem>
  <GridItem display={"flex"} alignItems={"center"} pl='60'  area={'header'} fontSize={"48px"} fontWeight='bold'>
  Discover Most Suitable products
  </GridItem>
  






  <GridItem pl='2'  area={'navi'}>

    <Text className='sidecursorpoint' mb={"2rem"} fontSize={"24px"} fontWeight='bold'>Home</Text>
    <Text className='sidecursorpoint' fontSize={"24px"} fontWeight='bold'>Top</Text>
          <Filter  imageUrl={Tropy} text={"Best of the year"}/>
          <Filter  imageUrl={Stats} text={"Popular in 2024"}/>
          <Filter  imageUrl={Coron} text={"Trainding"}/>
    <Text className='sidecursorpoint' fontSize={"24px"} mt={"2rem"} fontWeight='bold'>Categorie</Text>

          <Filter imageUrl={Lectro} text={"Electronics"}/>
          <Filter imageUrl={Fashen} text={"Fashion"}/>
          <Filter imageUrl={Cuisin} text={"Home & Kitchen"}/>

    <Text className='sidecursorpoint' fontSize={"24px"} mt={"2rem"} fontWeight='bold'>Cell Price</Text>
    <Text mb={1}>Up to $50</Text>
    <Text mb={1}>$50 to $100</Text>
    <Text mb={1}>$100 to $150</Text>
    <Text mb={1}>$200 & above</Text>
    
  </GridItem>







  <GridItem p='2'  area={'main'}>
  <Grid
  h='100%'
  templateRows='repeat(6, 1fr)'
  templateColumns='repeat(4, 1fr)'
  gap={4}
>









  {products.map(product => (
        <GridItem key={product.id} rowSpan={2} colSpan={1}>
          <Link to={`/products/${product.id}`}> {/* Use Link to wrap CustomCard */}
          <CustomCard
          id={product.id}
            imageUrl={product.photo}
            title={product.title}
            description={product.description}
            price={product.price}
          />
          </Link>
        </GridItem>
      ))}


<a href=""></a>









 
 
</Grid>
  </GridItem>

  



  {/* nPages, currentPage, setCurrentPage */}


  <GridItem pl='2' area={'footer'} >
    <Pagination nPages={5} currentPage={1} setCurrentPage={0} />
  </GridItem>
</Grid>

</>
  )
}

export default Homepage