
import { Box, Text, useColorModeValue } from '@chakra-ui/react';

const Footer = () => {
  return (
    <Box
      as="footer"
      w="100%"
      p={2}
      bg={useColorModeValue('gray.100', 'gray.900')}
      color={useColorModeValue('black', 'white')}
      position="fixed"
      bottom="0"
    >
      <Text textAlign="center">© 2024 Anonymous. All rights reserved.</Text>
    </Box>
  );
};

export default Footer;
