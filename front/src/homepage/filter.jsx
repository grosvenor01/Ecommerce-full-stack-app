// import { Box,Image } from '@chakra-ui/react'
// import { HStack, VStack } from '@chakra-ui/react'
// import React from 'react'
// import Tropy from './assets/sidebar/trophy.svg'
// function Filter() {
//   return (
//     <Box
//     mt={"1rem"}>
//         <HStack spacing={"12px"}>
//             <Image src={Tropy} alt='trophy' ></Image>
//             <Box>best of the year</Box>
//         </HStack>
//     </Box>
//   )
// }

// export default Filter


import { Box, Image } from '@chakra-ui/react';
import { HStack } from '@chakra-ui/react';
import React from 'react';

function Filter({ imageUrl, text }) {
  return (
    <Box className='sidecursorpoint' mt="1rem">
      <HStack spacing="12px">
        <Image src={imageUrl} alt="trophy" />
        <Box>{text}</Box>
      </HStack>
    </Box>
  );
}

export default Filter;
