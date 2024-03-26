import { Box } from '@chakra-ui/react'
import { Grid, GridItem } from '@chakra-ui/react'
import Dachnav from "./dachnav";
import Cart from "./cart";
import Navbar from '../navbar';

import cart1 from "../assets/dashboerd/cart1.png";
import cart2 from "../assets/dashboerd/cart2.png";
import rating from "../assets/dashboerd/rating.svg";

const Profile = () => {
  return (
    <Box mt={"2rem"}>
    <Navbar/>
   
    <Box   >

<Grid
  h='100%'
  templateRows='1fr'
  templateColumns='1fr 3fr'
  gap={4}
>
  <GridItem display={"flex"} justifyContent={"center"} rowSpan={1} colSpan={1}  >
<Dachnav/>
    </GridItem>
  <GridItem rowSpan={1} colSpan={1}  >

  <Grid templateColumns='repeat(2, 1fr)' gap={6}>


  <GridItem display={"flex"} justifyContent={"center"} w='100%'   alignItems={"center"} >

  <Cart
                imageUrl={cart1}
                title="Simple Headphone"
                description="Lorem ipsum dolor sit amet"
                savings="$0.20"
                price="$1.80"
                ratingImage={rating}
            />


    </GridItem>




  <GridItem w='100%'   >
  <Cart
                imageUrl={cart2}
                title="Simple Headphone"
                description="Lorem ipsum dolor sit amet"
                savings="$0.20"
                price="$1.80"
                ratingImage={rating}
            />

  </GridItem>


   
  <GridItem display={"flex"} justifyContent={"center"} w='100%'   alignItems={"center"} >

  <Cart
                imageUrl={cart1}
                title="Simple Headphone"
                description="Lorem ipsum dolor sit amet"
                savings="$0.20"
                price="$1.80"
                ratingImage={rating}
            />


    </GridItem>




  <GridItem w='100%'   >
  <Cart
                imageUrl={cart2}
                title="Simple Headphone"
                description="Lorem ipsum dolor sit amet"
                savings="$0.20"
                price="$1.80"
                ratingImage={rating}
            />

  </GridItem>
 
 
</Grid>

  </GridItem>
</Grid>




    </Box>
    </Box>
  )
}

export default Profile