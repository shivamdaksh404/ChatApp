
import { Box, Flex, Heading, useColorMode, IconButton, Button } from '@chakra-ui/react';
import { MoonIcon, SunIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
import { socket } from '../main'; // Adjust the path to where your socket instance is defined

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();

  const handleLogOut = () => {
    socket.emit("logout");
    localStorage.removeItem('isLogin');
    localStorage.removeItem('roomDetails');
    navigate('/login');
  }

  return (
    <Box
      pos="sticky"
      top="0"
      zIndex="sticky"
      bg="teal.500"
      px={4}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" color="white">
          Anonymous Chat
        </Heading>
        <Box>
          <Button
            size="sm"
            colorScheme="teal"
            aria-label="Logout"
            onClick={handleLogOut}
          >
            Logout
          </Button>
          <IconButton
            ml={2} // Add margin for spacing between Button and IconButton
            size="md"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            color="white"
            variant="ghost" // Use ghost variant for IconButton to make it transparent
            _hover={{ color: 'black' }} // Change icon color on hover
          />
        </Box>
      </Flex>
    </Box>
  );
};

const Header1 = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const navigate = useNavigate();
  const handleLogOut = () => {
    localStorage.removeItem('isLogin');
    localStorage.removeItem('roomDetails');
    navigate('/login')
  }

  return (
    <Box
      pos="sticky"
      top="0"
      zIndex="sticky"
      bg="teal.500"
      px={4}
    >
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Heading size="md" color="white">
        Anonymous Chat
        </Heading>
        <Box>
          <Button
            size="sm"
            colorScheme="teal"
            aria-label="Logout"
            onClick={() => {
              handleLogOut()
            }}
          >
            Logout
          </Button>
          <IconButton
            ml={2} // Add margin for spacing between Button and IconButton
            size="md"
            icon={colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
            aria-label="Toggle Color Mode"
            onClick={toggleColorMode}
            color="white"
            variant="ghost" // Use ghost variant for IconButton to make it transparent
            _hover={{ color: 'black' }} // Change icon color on hover
          />
        </Box>
      </Flex>
    </Box>
  );
};

export default Header;
