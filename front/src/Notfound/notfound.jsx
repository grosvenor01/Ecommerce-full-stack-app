
import { Box,Image,HStack,Button } from "@chakra-ui/react";
import notfoud_illustration from "../assets/Notfound/notfoud_illustration.png";
import { Grid, GridItem,Text } from '@chakra-ui/react'
import Navbar from "../navbar";
const Notfound = () => {
  return (
    <Box mt={"2rem"}>
    <Navbar/>
  
    <Box fontFamily={"Poppins , sans-serif"} h={"42rem"} display={"flex"} justifyContent={"center"}>

<Grid templateColumns='repeat(2, 1fr)' gap={6}>
  <GridItem pl={"5rem"}  w='100%'   >

    <Text fontSize={"153px"} fontWeight={"bold"} mb={0} mt={"2rem"}  >404</Text>
    <Text mb={"0.3rem"}>Whoops!</Text>
    <Text mb={"5rem"}>We couldnt find that page.</Text>
    <Button _hover={"none"} className="king" padding={"1.4rem 5.5rem"} fontWeight={"light"} backgroundColor={"#fff"} color={"black"}>Main page</Button>
    </GridItem>
  <GridItem w='100%'   >
        <Image src={notfoud_illustration}></Image>
  </GridItem>

</Grid>
      
        
    </Box>
    </Box>
  )
}

export default Notfound