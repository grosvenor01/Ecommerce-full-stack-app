// import { Grid, GridItem ,Box,Image,Text,HStack} from '@chakra-ui/react'
// import Navbar from "../navbar";
// import imagemain from "../assets/oneproduct/imagemain.png";
// import image1 from "../assets/oneproduct/image1.png";
// import image2 from "../assets/oneproduct/image2.png";
// import image3 from "../assets/oneproduct/image3.png";
// import image4 from "../assets/oneproduct/image4.png";
// import circule1 from "../assets/oneproduct/circule1.png";
// import circule2 from "../assets/oneproduct/circule2.png";
// import circule3 from "../assets/oneproduct/circule3.png";
// import { useParams } from 'react-router-dom';



// // function Prodsec1() {
// //   const { id } = useParams();

// //   // Rest of your code...

// //   return (
// //     // JSX code...
// //   );
// // }

// // export default Prodsec1;







// function Prodsec1() {
//   const { id } = useParams()
//   console.log(id)

//   return (
//     <Box mt={"2rem"}>
//     <Navbar/>
   
//     <Box mt={"2rem"} display={"flex"} justifyContent={"Center"} >
//     <Grid
//     mt={"1rem"}
//     maxW={"80rem"}
//   h='550px'
//   templateRows='repeat(6, 1fr)'
//   templateColumns='1fr 2fr 3fr'
//   gap={4}
// >
//   <GridItem rowSpan={5} colSpan={1}  display={"flex"}  alignItems={"flex-end"} flexDir={"column"}  >
//     <Image className='navlogohover' src={image1} width={"80px"} h={"80px"} m={"5px"} ></Image>
//     <Image className='navlogohover' src={image2} width={"80px"} h={"80px"} m={"5px"} ></Image>
//     <Image className='navlogohover' src={image3} width={"80px"} h={"80px"} m={"5px"} ></Image>
//     <Image className='navlogohover' src={image4} width={"80px"} h={"80px"} m={"5px"} ></Image>

//   </GridItem>
//   <GridItem mr={"2rem"} rowSpan={5} colSpan={1}   >
//     <Image src={imagemain} width={"100%"} h={"100%"} ></Image>
//   </GridItem>




//   <GridItem pl={"3rem"}   fontFamily={"Poppins , sans-serif"} rowSpan={6} colSpan={1}  >
//     <Text m={"0px"}  fontSize={"40px"}>Asgaard sofa</Text>
//     <Text fontSize={"22px"} color={"#9F9F9F"}>2500,000.00</Text>
//     <Text color={"#E8E8E8"} fontWeight={"regular"}  fontSize={"12px"} >Setting the bar as one of the loudest speakers in its class, the Kilburn is a compact, stout-hearted hero with a well-balanced audio which boasts a clear midrange and extended highs for a sound.
// </Text>
// <Text mt={"2rem"} mb={"0.5rem"} fontSize={"13px"} color={"#9F9F9F"}>Color</Text>
// <HStack mb={"2rem"}>
  
//       <Image className='navlogohover' src={circule1} width={"30px"} h={"30px"} mr={"5px"} ></Image>
//       <Image className='navlogohover' src={circule2} width={"30px"} h={"30px"} mr={"5px"} ></Image>
//       <Image className='navlogohover' src={circule3} width={"30px"} h={"30px"} mr={"5px"} ></Image>
// </HStack>

// <HStack>
//   <Box className='navlogohover' border={"1px solid #E8E8E8"} padding={"1rem 2rem"} borderRadius={"13px"} mr={"1rem"}>
//     Add to cart
//   </Box>
//   <Box className='navlogohover' border={"1px solid #E8E8E8"} padding={"1rem 3rem"} borderRadius={"13px"} mr={"1rem"}>
//     Buy now
//   </Box>
// </HStack>
//   </GridItem>
//   {/* <GridItem colSpan={4} bg='tomato' /> */}



// </Grid>
// </Box>
// </Box>
//   )
// }

// export default Prodsec1

import  { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, GridItem, Box, Image, Text, HStack } from '@chakra-ui/react';
import Navbar from "../navbar";
import circule1 from "../assets/oneproduct/circule1.png";
import circule2 from "../assets/oneproduct/circule2.png";
import circule3 from "../assets/oneproduct/circule3.png";
import { Link } from 'react-router-dom';


function Prodsec1() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Box mt={"2rem"}>
      <Navbar />
      <Box mt={"2rem"} display={"flex"} justifyContent={"Center"} >
        <Grid
          mt={"1rem"}
          maxW={"80rem"}
          h='550px'
          templateRows='repeat(6, 1fr)'
          templateColumns='1fr 2fr 3fr'
          gap={4}
        >
          <GridItem rowSpan={5} colSpan={1} display={"flex"} alignItems={"flex-end"} flexDir={"column"}  >
            <Image className='navlogohover' src={product.photo_add1} width={"80px"} h={"80px"} m={"5px"} />
            <Image className='navlogohover' src={product.photo_add2} width={"80px"} h={"80px"} m={"5px"} />
            <Image className='navlogohover' src={product.photo_add3} width={"80px"} h={"80px"} m={"5px"} />
            <Image className='navlogohover' src={product.photo_add4} width={"80px"} h={"80px"} m={"5px"} />
          </GridItem>
          <GridItem mr={"2rem"} rowSpan={5} colSpan={1}  >
            <Image src={product.photo} width={"100%"} h={"100%"} />
          </GridItem>
          <GridItem pl={"3rem"} fontFamily={"Poppins , sans-serif"} rowSpan={6} colSpan={1}  >
            <Text m={"0px"} fontSize={"40px"}>{product.title}</Text>
            <Text fontSize={"22px"} color={"#9F9F9F"}>{product.price}</Text>
            <Text color={"#E8E8E8"} fontWeight={"regular"} fontSize={"12px"}>{product.description}</Text>
            <Text mt={"2rem"} mb={"0.5rem"} fontSize={"13px"} color={"#9F9F9F"}>Color</Text>
            <HStack mb={"2rem"}>
              <Image className='navlogohover' src={circule1} width={"30px"} h={"30px"} mr={"5px"} />
              <Image className='navlogohover' src={circule2} width={"30px"} h={"30px"} mr={"5px"} />
              <Image className='navlogohover' src={circule3} width={"30px"} h={"30px"} mr={"5px"} />
            </HStack>
            <HStack>
            <Link to={`/cart/${id}`}> 
              <Box className='navlogohover' border={"1px solid #E8E8E8"} padding={"1rem 2rem"} borderRadius={"13px"} mr={"1rem"}>
                Add to cart
              </Box>
              </Link>

              <Link to={`/buy/${id}`}> 
              
              <Box className='navlogohover' border={"1px solid #E8E8E8"} padding={"1rem 3rem"} borderRadius={"13px"} mr={"1rem"}>
                Buy now
              </Box>
              </Link>


            </HStack>
          </GridItem>
        </Grid>
      </Box>
    </Box>
  );
}

export default Prodsec1;
