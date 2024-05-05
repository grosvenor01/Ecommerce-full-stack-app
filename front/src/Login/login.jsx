

import { useState, useRef } from 'react';
import axios from 'axios';
import { Box, VStack, Input, Text, HStack, Image } from '@chakra-ui/react';
import { Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom'; // Import Link
import Navbar from "../navbar";
import appel from "../assets/auth/apel.png";
import google from "../assets/auth/google.png";
import meta from "../assets/auth/meta.png";
import line from "../assets/auth/line.svg";

const Login = () => {
  const [username, setUsername] = useState(''); // Changed to username
  const [password, setPassword] = useState('');
  const hiddenLinkRef = useRef(null); // Ref for the hidden link

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', {
        username: username,
        password: password
      }, {
        withCredentials: true
      });
      if (response.status === 200) {
        console.log('Login successful:', response.data.id);
        console.log('Token:', response.data.token);

        // Store user ID and token in local storage
        localStorage.setItem('userId', response.data.id);
        localStorage.setItem('token', response.data.token);

        // Trigger click event on hidden link upon successful login
        hiddenLinkRef.current.click();
      } else {
        console.log('Login failed:', response.data);
        alert('Login failed. Please check your credentials and try again.'); // Display an alert for failed login
      }
    } catch (error) {
      console.error('Error logging in:', error);
      alert('An error occurred while logging in. Please try again later.'); // Display an alert for error
    }
  };

  return (
    <Box mt={"2rem"}>
      <Navbar />
      <Box display={"flex"} justifyContent={"center"} bg >
        <VStack width={"470px"} h={"495px"} borderRadius={"3px"} mt={'2rem'} bg={"#202020"} p={"1rem"}>
          <Text fontWeight={"bold"} fontSize={"30px"} width={"100%"} >
            Log in
          </Text>
          <Input
            m={"1rem 0"}
            width={"80%"}
            htmlSize={4}
            placeholder='Username' // Changed to Username
            h={"3.3rem"}
            value={username} // Changed to username
            onChange={(e) => setUsername(e.target.value)} // Changed to setUsername
          />
          <Input
            type='password'
            width={"80%"}
            htmlSize={4}
            placeholder='Password'
            h={"3.3rem"}
            mb={"2rem"}
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
          <Button padding={"1rem 5rem"} fontWeight={"light"} backgroundColor={"#0366FF"} onClick={handleLogin}>Login</Button>
          <Text>do not have an account <Link to="/register" style={{ color: "#0366FF" }}>register</Link></Text>
          {/* Hidden Link for redirecting to /register */}
          <Link to="/profile" style={{ display: 'none' }} ref={hiddenLinkRef}></Link>
        </VStack>
      </Box>
    </Box>
  );
}

export default Login;
