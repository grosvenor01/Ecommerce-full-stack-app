import React from 'react'
import { Grid, GridItem,Box,Text } from '@chakra-ui/react'
import Filter from './filter'
import Tropy from '../assets/sidebar/trophy.svg'
import Stats from '../assets/sidebar/stats.svg'
import Coron from '../assets/sidebar/coron.svg'
import Lectro from '../assets/sidebar/lectro.svg'
import Fashen from '../assets/sidebar/fashen.svg'
import Cuisin from '../assets/sidebar/cuisin.svg'

import CustomCard from './card'
import Navbar from '../navbar'
import Pagination from './pagination'

// const Pagination = ({ nPages, currentPage, setCurrentPage }) => {

// .poppins-thin {
//     font-family: "Poppins", sans-serif;
//     font-weight: 100;
//     font-style: normal;
//   }







const Homepage = () => {
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
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
  <GridItem rowSpan={2} colSpan={1} >
    
    <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
  </GridItem>
 
 
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