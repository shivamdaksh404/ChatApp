import  { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Button,
  Heading,
  VStack,
  Text,
  useColorMode,
  useColorModeValue,
  IconButton,
  FormErrorMessage
} from '@chakra-ui/react';
import { SwapOutlined } from '@ant-design/icons'; // Import Ant Design icons
import { useNavigate } from 'react-router-dom';
import { socket } from '../main';


const LoginPage = () => {
 // const{socket} = useContext(AppContext)
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('white', 'gray.700');
  const icon = useColorModeValue(<SwapOutlined />, <SwapOutlined />); // Use the same icon for simplicity
const navigate=useNavigate();
  // State for form data and errors
  const [formData, setFormData] = useState({
    username: '',
    secretKey: ''
  });
  const [errors, setErrors] = useState({
    username: '',
    secretKey: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Validate form fields
  const validateForm = () => {
    let valid = true;
    const newErrors = {
      username: '',
      secretKey: ''
    };

    if (formData.username.trim() === '') {
      newErrors.username = 'Username is required';
      valid = false;
    }

    if (formData.secretKey.trim() === '') {
      newErrors.secretKey = 'Secret key is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      localStorage.setItem('roomDetails', JSON.stringify(formData))
      localStorage.setItem('isLogin', true)
      socket.emit("join_room",formData)
      navigate('/')
    } else {
      console.error('Form has errors');
    }
  };

  return (
    <Box
      w="100vw"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgGradient={useColorModeValue(
        'linear(to-r, gray.300, yellow.400, pink.200)',
        'linear(to-r, gray.800, gray.700, gray.600)'
      )}
    >
      <Box
        p={8}
        maxWidth="400px"
        borderWidth={1}
        borderRadius={8}
        boxShadow="lg"
        bg={formBackground}
      >
        <VStack spacing={4} align="stretch" as="form" onSubmit={handleSubmit}>
          <Heading as="h1" size="lg" textAlign="center">
            Login
          </Heading>
          <FormControl isInvalid={!!errors.username}>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              name="username"
              placeholder="Enter your username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={!!errors.secretKey}>
            <FormLabel>Secret Key</FormLabel>
            <Input
              type="password"
              name="secretKey"
              placeholder="Enter your secret key"
              value={formData.secretKey}
              onChange={handleInputChange}
            />
            <FormErrorMessage>{errors.secretKey}</FormErrorMessage>
          </FormControl>
          <Button type="submit" colorScheme="teal" variant="solid">
            Login
          </Button>
        </VStack>
        <Text mt={4} textAlign="center" fontSize="sm">
          Forgot your secret key?{' '}
          <Button variant="link" colorScheme="teal">
            Reset it here
          </Button>
        </Text>
        <IconButton
          aria-label="Toggle dark mode"
          icon={icon}
          onClick={toggleColorMode}
          mt={4}
          alignSelf="center"
        />
      </Box>
    </Box>
  );
}

export default LoginPage;
