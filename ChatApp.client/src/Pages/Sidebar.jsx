
import { Box, VStack, Link, useColorModeValue } from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';

const Sidebar = () => {
  return (
    <Box
      w="250px"
      h="100vh"
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('black', 'white')}
      p={4}
      position="fixed"
    >
      <VStack align="left" spacing={4}>
        {/* <Link as={RouterLink} to="/home">
          Home
        </Link>
        <Link as={RouterLink} to="/profile">
          Profile
        </Link> */}
        <Link as={RouterLink} to="#">
          Chat Room
        </Link>
      </VStack>
    </Box>
  );
};

export default Sidebar;
