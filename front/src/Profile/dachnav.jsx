import { Box ,Text,HStack,Image,VStack} from '@chakra-ui/react'
import profileimg from "../assets/profile/profileimg.png";
import saveditems from "../assets/dashboerd/saved items.svg";
import profile from "../assets/dashboerd/update profile.svg";
// import dashboerd from "../assets/dashboerd/dashboerd.svg";
import hsitory from "../assets/dashboerd/order hsitory.svg";
import logout from "../assets/dashboerd/logout.svg";
import transactions from "../assets/dashboerd/all transactions.svg";
import dashblask from "../assets/dashboerd/dashblask.svg";

import { Link } from 'react-router-dom';
import  { useState, useEffect } from 'react';
import axios from 'axios';

const Dachnav = () => {
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
  };
  const userId = localStorage.getItem('userId');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/users/${userId}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  
    return (
      <Box h={"fit-content"} fontFamily={"Poppins , sans-serif"} mt={"1rem"} width={"20rem"} p={"1rem 0 0 0"} borderRadius={"5px"} border={"  3px solid #D6D6D6"}>
        <HStack border={"  2px solid #D6D6D6"} m={"0 1rem 2rem 1rem"}>
          <Image src={profileimg}></Image>
          <Box display={"flex"} flexDir={"column"}>
            <Text fontSize={"16px"} fontWeight={"semibold"}>{ userData!=null ?userData[0].username: "name"  }</Text>
            <Text>{ userData!=null ?userData[0].username: "name"  } </Text>
          </Box>
        </HStack>
        <VStack spacing={"0rem"}>
            <Box  bg={"#D6D6D6"} width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
              <Image src={dashblask}></Image>
              <Text className='sidecursorpoint' fontWeight={"semibold"} color={'#1E1E1E'} pl={"0.5rem"} pt={"1rem"}>Dashboard</Text>
            </Box>
          <Box  width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image src={hsitory}></Image>
            <Text className='sidecursorpoint' pl={"0.5rem"} pt={"1rem"}>Order History</Text>
          </Box>
          <Box  width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image src={transactions}></Image>
            <Text className='sidecursorpoint' pl={"0.5rem"} pt={"1rem"}>All transactions</Text>
          </Box>
          <Box  width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image src={saveditems}></Image>
            <Text className='sidecursorpoint' pl={"0.5rem"} pt={"1rem"}>Saved items</Text>
          </Box>
          <Box  width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image src={profile}></Image>
            <Text className='sidecursorpoint' pl={"0.5rem"} pt={"1rem"}>User profile</Text>
          </Box>
          
          <Box  width={"101%"} borderRadius={"5px"} border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <Image src={logout}></Image>
            <Link to="/" className='sidecursorpoint' >
            <Text pl={"0.5rem"} pt={"1rem"} onClick={handleLogout}>Log out</Text>
          </Link>
          </Box>
        </VStack>
      </Box>
    );
  }
  
  export default Dachnav;