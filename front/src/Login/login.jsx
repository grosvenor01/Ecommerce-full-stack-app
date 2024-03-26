import { Box,VStack,Input,Text,HStack,Image } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import Navbar from "../navbar";
import appel from "../assets/auth/apel.png";
import google from "../assets/auth/google.png";
import meta from "../assets/auth/meta.png";
import line from "../assets/auth/line.svg";

const Login = () => {
  return (
<Box mt={"2rem"}>
<Navbar/>

    <Box display={"flex"} justifyContent={"center"} bg >
      <VStack width={"470px"}h={"495px"}  borderRadius={"3px"} mt={'2rem'} bg={"#202020"} p={"1rem"}>
        <Text fontWeight={"bold"} fontSize={"30px"} width={"100%"} >
          Log in
        </Text>

        <Input m={"1rem 0"} width={"80%"} htmlSize={4}  placeholder='Email' h={"3.3rem"} />

        <Input width={"80%"}  htmlSize={4} placeholder='Password' h={"3.3rem"} mb={"2rem"} />
        <HStack>
        <Text>Or connect with </Text>

          <Image src={line} mb={"1rem"}/>
        </HStack>

        <HStack mb={"1rem"}>
          <Image className='navlogohover'  src={google} />
          <Image className='navlogohover' src= {meta}/>
          <Image onClick={()=> console.log("hello")} className='navlogohover' src={appel} />


        </HStack>
        <Button padding={"1rem 5rem"} fontWeight={"light"} backgroundColor={"#0366FF"}>Button</Button>
          {/* TODO THIS IS GOING TO BE A LINK */}
          <Text>Dont have an account <span style={{ color: "#0366FF" }}>register</span></Text>

      </VStack>
    </Box>
    </Box>

  )
}

export default Login