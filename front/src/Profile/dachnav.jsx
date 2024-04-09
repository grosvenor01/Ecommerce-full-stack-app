import { Box ,Text,HStack,Image,VStack} from '@chakra-ui/react'
import profileimg from "../assets/profile/profileimg.png";
import saveditems from "../assets/dashboerd/saved items.svg";
import profile from "../assets/dashboerd/update profile.svg";
// import dashboerd from "../assets/dashboerd/dashboerd.svg";
import hsitory from "../assets/dashboerd/order hsitory.svg";
import logout from "../assets/dashboerd/logout.svg";
import transactions from "../assets/dashboerd/all transactions.svg";
import dashblask from "../assets/dashboerd/dashblask.svg";


const Dachnav = () => {
  return (
    <Box h={"fit-content"} fontFamily={"Poppins , sans-serif"} mt={"1rem"} width={"20rem"}  p={"1rem 0 0 0"} borderRadius={"5px"} border={"  3px solid #D6D6D6"}>
        {/* bg={"red"} */}

    <HStack    border={"  2px solid #D6D6D6"} m={"0 1rem 2rem 1rem"}>
        <Image src={profileimg}>
        </Image>
        <Box display={"flex"} flexDir={"column" }>

<Text fontSize={"16px"} fontWeight={"semibold"}>John Doe Name</Text>
<Text>John </Text>



        </Box>
    </HStack>
    <VStack spacing={"0rem"} >
        <Box className='sidecursorpoint' bg={"#D6D6D6"}  width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image  src={dashblask}></Image>
        <Text fontWeight={"semibold"} color={'#1E1E1E'} pl={"0.5rem"} pt={"1rem"}>Dashboard</Text>
        </Box>


        <Box className='sidecursorpoint' width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image src={hsitory}></Image>
        <Text pl={"0.5rem"} pt={"1rem"}>Order History</Text>
        </Box>
        
        
        
        <Box className='sidecursorpoint' width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image src={transactions}></Image>
        <Text pl={"0.5rem"} pt={"1rem"}>All transactions</Text>
        </Box>

        <Box className='sidecursorpoint' width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image src={saveditems}></Image>
        <Text pl={"0.5rem"} pt={"1rem"}>Saved items</Text>
        </Box>
        <Box className='sidecursorpoint' width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image src={profile}></Image>
        <Text pl={"0.5rem"} pt={"1rem"}>User profile</Text>
        </Box>
        <Box className='sidecursorpoint' width={"101%"} borderRadius={"5px"}  border={"  2px solid #D6D6D6"} display={"flex"} justifyContent={"center"} alignItems={"center"}> 
            <Image src={logout}></Image>
        <Text pl={"0.5rem"} pt={"1rem"}>Log out</Text>
        </Box>



    </VStack>



    </Box>
  )
}

export default Dachnav