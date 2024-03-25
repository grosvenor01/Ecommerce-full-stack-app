import { Box, HStack,Text,VStack,Image } from '@chakra-ui/react'
import React from 'react'
import CustomCard from "../homepage/card";
import imageg1 from "../assets/oneproduct/imageg1.png";
import imageg2 from "../assets/oneproduct/imageg2.png";

const Prodsec2 = () => {
  return (
    <Box mt={"2rem"} display={"flex" }justifyContent={"center"}>

        <VStack margin={"0 auto"} width={"90%"}  fontSize={"24px"} fontFamily={"Poppins , sans-serif"} >
            <HStack spacing={"2rem"} margin={"0 auto"}>
                <Text>
                    Description
                </Text>
                <Text color={"#9F9F9F"}>
                Additional Information
                </Text>
                <Text color={"#9F9F9F"}>
                Reviews [5]
                </Text>
            </HStack >

            <Text color={"#9F9F9F"} fontSize={"18px"} >Embodying the raw, wayward spirit of rock ‘n’ roll, the Kilburn portable active stereo speaker takes the unmistakable look and sound of Marshall, unplugs the chords, and takes the show on the road.</Text>
            <Text color={"#9F9F9F"} fontSize={"18px"} >Weighing in under 7 pounds, the Kilburn is a lightweight piece of vintage styled engineering. Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound that is both articulate and pronounced. The analogue knobs allow you to fine tune the controls to your personal preferences while the guitar-influenced leather strap enables easy and stylish travel.</Text>


            <HStack display={"flex"}  justifyContent={"center"} spacing={6} width={"100%"} mb={"2rem"}  >
                <Image src={imageg1}></Image>
                <Image src={imageg2}></Image>

            </HStack>
            <HStack display={"flex"}  justifyContent={"space-around"} spacing={6} width={"100%"} mb={"2rem"} >
            <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
  
/>
<CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/> <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/> <CustomCard 
  imageUrl='https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80'
  title='Product Title'
  description='Product Description'
  price={100}
/>
            </HStack>
        </VStack>

    </Box>
  )
}

export default Prodsec2