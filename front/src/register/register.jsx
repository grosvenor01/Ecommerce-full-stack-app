import  { useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link component
import { Box, VStack, Input, Text, HStack, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import Navbar from "../navbar";
import appel from "../assets/auth/apel.png";
import google from "../assets/auth/google.png";
import meta from "../assets/auth/meta.png";
import line from "../assets/auth/line.svg";

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const linkRef = useRef(); // Create a ref for the Link component

  const handleRegister = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/register/', {

        username: username,
        email: email,
        password: password
      });
      console.log('Registration successful:', response.data);
      // Trigger click event on the invisible link to redirect to profile page
      linkRef.current.click();
    } catch (error) {
      console.error('Error registering:', error);
      // Display an alert message if registration fails
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <Box mt={"2rem"}>
      <Navbar />
      <Box display={"flex"} justifyContent={"center"} bg >
        <VStack width={"470px"} h={"550px"} borderRadius={"3px"} mt={'2rem'} bg={"#202020"} p={"1rem"}>
          <Text fontWeight={"bold"} fontSize={"30px"} width={"100%"} >
            Register
          </Text>

          <Input
            mt={"1rem"}
            width={"80%"}
            htmlSize={4}
            placeholder='Username'
            h={"3.3rem"}
            mb={"0.5rem"}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Input
            type='email'
            width={"80%"}
            htmlSize={4}
            placeholder='Email'
            h={"3.3rem"}
            mb={"0.5rem"}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type='password'
            width={"80%"}
            htmlSize={4}
            placeholder='Password'
            h={"3.3rem"}
            mb={"1rem"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <HStack>
            <Text>Or connect with </Text>
            <Image src={line} mb={"1rem"} />
          </HStack>

          <HStack mb={"1rem"}>
            <Image className='navlogohover' src={google} />
            <Image className='navlogohover' src={meta} />
            <Image onClick={() => console.log("hello")} className='navlogohover' src={appel} />
          </HStack>
          <Button padding={"1rem 5rem"} fontWeight={"light"} backgroundColor={"#0366FF"} onClick={handleRegister}>Register</Button>
          <Text>Already have an account <Link to="/login" style={{ color: "#0366FF" }}>login</Link></Text>
          {/* Invisible Link component to redirect to /profile */}
         
          <Link to="/login" ref={linkRef} style={{ display: 'none' }} />
          {/* Link component to redirect to /login */}
          
        </VStack>
      </Box>
    </Box>
  );
}

export default Register;
