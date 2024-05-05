import React from 'react';
import { Box, VStack, Button, Image, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import orderHistoryIcon from "../assets/dashboerd/order hsitory.svg";
import savedItemsIcon from "../assets/dashboerd/saved items.svg";
import userProfileIcon from "../assets/dashboerd/update profile.svg";
import logoutIcon from "../assets/dashboerd/logout.svg";



const Dachnav = ({ activeSection, setActiveSection, handleLogout }) => {
  return (
    <Box h="fit-content" fontFamily="Poppins, sans-serif" mt="1rem" width="20rem" p="1rem" borderRadius="5px" border="3px solid #D6D6D6">
      <VStack spacing="0rem">
        <NavItem icon={userProfileIcon} label="User Profile" onClick={() => setActiveSection('profile')} active={activeSection === 'profile'} />
        <NavItem icon={orderHistoryIcon} label="Order History" onClick={() => setActiveSection('orders')} active={activeSection === 'orders'} />
        <NavItem icon={savedItemsIcon} label="Saved Items" onClick={() => setActiveSection('wishlist')} active={activeSection === 'wishlist'} />
        <LogoutItem icon={logoutIcon} handleLogout={handleLogout} />
      </VStack>
    </Box>
  );
};

const NavItem = ({ icon, label, onClick, active }) => (
  <Button w="100%" justifyContent="flex-start" pl="2" variant={active ? 'solid' : 'ghost'} onClick={onClick}>
    <Image src={icon} boxSize="20px" />
    <Text pl="2">{label}</Text>
  </Button>
);

const LogoutItem = ({ icon, handleLogout }) => (
  <Link to="/login">
    <Button w="100%" justifyContent="flex-start" pl="2" variant="ghost" onClick={handleLogout}>
      <Image src={icon} boxSize="20px" />
      <Text pl="2">Log Out</Text>
    </Button>
  </Link>
);

export default Dachnav;