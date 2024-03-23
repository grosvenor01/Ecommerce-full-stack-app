import React from 'react'
import { Box,Center,Image,Stack } from '@chakra-ui/react'
import Cart from '../assets/cart.svg'
import Points from '../assets/points.svg'
import Racklogo from '../assets/Racklogo.svg'
import Profile from '../assets/profile.svg'
import Heart from '../assets/heart.svg'
import { Input, InputGroup, InputLeftElement, InputRightElement } from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import { HStack, VStack } from '@chakra-ui/react'
const Navbar = () => {
  return (<>
    <Box boxSize='lr'  width={"100%"} >


    <HStack  spacing='24px' >
  <Image className="navlogohover"  src={Racklogo} alt='Rack logo' />


  <InputGroup bg={""} width={"75%"} alignItems="center">
    <InputLeftElement  pointerEvents='none'>
      <SearchIcon mt={"10px"}  color='white' />
    </InputLeftElement>
    <Input height={"3rem"} borderRadius={"20px"} type='text' placeholder='Search product' />
</InputGroup>



  <HStack spacing='24px'>
  <Image className='navimghover' src={Profile} alt='Rack logo' />
  <Image className='navimghover' src={Heart} alt='Rack logo' />
  <Image className='navimghover' src={Cart} alt='Rack logo' />
  <Image className='navimghover' src={Points} alt='Rack logo' />
</HStack>

  </HStack>



    






</Box>
    </>
  )
}

export default Navbar