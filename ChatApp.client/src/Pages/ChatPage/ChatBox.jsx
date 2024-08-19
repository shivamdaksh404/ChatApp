import { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Input,
  IconButton,
  Stack,
  Text,
  useColorModeValue,
  Grid,
} from "@chakra-ui/react";
import { ArrowRightIcon, CheckIcon } from "@chakra-ui/icons";
import { socket } from "../../main"; // Ensure this imports a stable socket instance

const ChatPage1 = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const inputBgColor = useColorModeValue("gray.200", "gray.600");
  const inputColor = useColorModeValue("black", "white");
  const Data = localStorage.getItem("roomDetails");
  const formData = JSON.parse(Data);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages
    console.log(formData, "data 1 2 3");
    const newMsg = {
      id: messages.length + 1,
      secretKey: formData.secretKey,
      text: newMessage,
      sender: formData.username, // Assuming user sends all messages for simplicity
      // time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
      time: formatTime(new Date(Date.now())),
      read: false,
    };

    await socket.emit("send_message", newMsg);
    setMessages((list) => [...list, newMsg]);
    setNewMessage("");
  };
  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((list) => [...list, data]);
    });
  }, [socket]);

  return (
    <Box
      mx={0}
      p={4}
      bg={bgColor}
      color={textColor}
      h={"84vh"}
      display="flex"
      flexDirection="column"
    >
      {/* Chat Messages (Scrollable Area) */}
      <Box
        flex="1"
        overflowY="auto"
        py={4}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue("gray.400", "gray.600"),
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: useColorModeValue("gray.500", "gray.700"),
          },
          "&::-webkit-scrollbar-track": {
            background: useColorModeValue("gray.200", "gray.800"),
          },
        }}
      >
        <Stack spacing={4} p={4}>
          {messages.map((message, index) => (
            <Flex
              key={`${message.id}_KEY_${index}`}
              justify={
                message.sender === formData.username ? "flex-end" : "flex-start"
              }
            >
              <Box>
                {" "}
                <Box
                  //  maxW="80%"
                  p={2}
                  bg={
                    message.sender === formData.username
                      ? "blue.400"
                      : "teal.400"
                  }
                  color={
                    message.sender === formData.username ? "white" : "black"
                  }
                  borderRadius="xl"
                  position="relative"
                >
                  <Text>{message.text}</Text>
                  {message.sender === formData.username && message.read && (
                    <CheckIcon
                      color="white"
                      position="absolute"
                      bottom={1}
                      right={1}
                    />
                  )}
                </Box>
                <Flex
                  align={"center"}
                  // justify={"center"}
                  gap={2}
                  flexDirection={
                    message.sender === formData.username && "row-reverse"
                  }
                >
                  {message.sender !== formData.username && (
                    <Text
                      fontSize="xs"
                      fontWeight={"bold"}
                      color={"teal.500"}
                      pt={1}
                    >
                      {message.sender}
                    </Text>
                  )}
                  <Text
                    fontSize="xs"
                    mt={1}
                    textAlign="right"
                    color={
                      message.sender !== formData.username
                        ? "red.500"
                        : "red.500"
                    }
                  >
                    {message.time}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Box>

      {/* Sticky Footer */}
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        p={1}
        m={0}
        border={0}
        borderRadius={20}
        bg={inputBgColor}
        alignItems="center"
        justifyContent="center"
        position="sticky"
        bottom={50}
        zIndex="sticky"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          variant="filled"
          size="sm"
          focusBorderColor="transparent"
          borderRadius={20}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          bg={inputBgColor}
          color={inputColor}
          required
          _hover={inputBgColor}
        />
        <IconButton
          type="submit"
          aria-label="Send message"
          icon={<ArrowRightIcon />}
          borderRadius={20}
          bg={inputBgColor}
        />
      </Flex>
    </Box>
  );
};

const ChatPage = () => {
  const bgColor = useColorModeValue("gray.100", "gray.800");
  const textColor = useColorModeValue("gray.800", "gray.100");
  const inputBgColor = useColorModeValue("gray.200", "gray.600");
  const inputColor = useColorModeValue("black", "white");
  const Data = localStorage.getItem("roomDetails");
  const formData = JSON.parse(Data);

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [connectionMessages, setConnectionMessages] = useState([]);

  const handleSendMessage = async () => {
    if (newMessage.trim() === "") return; // Prevent sending empty messages
    const newMsg = {
      id: messages.length + 1,
      secretKey: formData.secretKey,
      text: newMessage,
      sender: formData.username, // Assuming user sends all messages for simplicity
      time: formatTime(new Date(Date.now())),
      read: false,
    };

    await socket.emit("send_message", newMsg);
    setMessages((list) => [...list, newMsg]);
    setNewMessage("");
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  useEffect(() => {
    // Fetch previous messages from local storage or server
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(storedMessages);

    const handleReceiveMessage = (data) => {
      setMessages((list) => [...list, data]);
      // Update local storage with new messages
      localStorage.setItem(
        "messages",
        JSON.stringify([...storedMessages, data])
      );
    };

    const handleUserConnected = (data) => {
      setConnectionMessages((list) => [
        ...list,
        {
          message: `${data.username} has connected`,
          time: formatTime(new Date(Date.now())),
        },
      ]);
    };

    const handleUserDisconnected = (data) => {
      setConnectionMessages((list) => [
        ...list,
        {
          message: `${data.username} has disconnected`,
          time: formatTime(new Date(Date.now())),
        },
      ]);
    };

    socket.on("receive_message", handleReceiveMessage);
    socket.on("user_connected", handleUserConnected);
    socket.on("user_disconnected", handleUserDisconnected);

    return () => {
      socket.off("receive_message", handleReceiveMessage);
      socket.off("user_connected", handleUserConnected);
      socket.off("user_disconnected", handleUserDisconnected);
    };
  }, []);

  return (
    <Box
      mx={0}
      p={4}
      bg={bgColor}
      color={textColor}
      h={"84vh"}
      display="flex"
      flexDirection="column"
    >
      {/* Chat Messages (Scrollable Area) */}
      <Box
        flex="1"
        overflowY="auto"
        py={4}
        css={{
          "&::-webkit-scrollbar": {
            width: "8px",
          },
          "&::-webkit-scrollbar-thumb": {
            background: useColorModeValue("gray.400", "gray.600"),
            borderRadius: "8px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: useColorModeValue("gray.500", "gray.700"),
          },
          "&::-webkit-scrollbar-track": {
            background: useColorModeValue("gray.200", "gray.800"),
          },
        }}
      >
        <Stack spacing={4} p={4}>
          {connectionMessages.map((msg, index) => (
            <Box key={`conn_${index}`} textAlign="center" alignContent="center">
              <Text fontSize="xs" mt={1} color="gray.600">
                {msg.time}
              </Text>

              <Text bg="green.400" borderRadius="lg" color="black">
                {msg.message}
              </Text>
            </Box>
          ))}
          {messages.map((message, index) => (
            <Flex
              key={`${message.id}_KEY_${index}`}
              justify={
                message.sender === formData.username ? "flex-end" : "flex-start"
              }
            >
              <Box>
                <Box
                  p={2}
                  bg={
                    message.sender === formData.username
                      ? "blue.400"
                      : "teal.400"
                  }
                  color={
                    message.sender === formData.username ? "white" : "black"
                  }
                  borderRadius="xl"
                  position="relative"
                >
                  <Text>{message.text}</Text>
                  {message.sender === formData.username && message.read && (
                    <CheckIcon
                      color="white"
                      position="absolute"
                      bottom={1}
                      right={1}
                    />
                  )}
                </Box>
                <Flex
                  align={"center"}
                  gap={2}
                  flexDirection={
                    message.sender === formData.username && "row-reverse"
                  }
                >
                  {message.sender !== formData.username && (
                    <Text
                      fontSize="xs"
                      fontWeight={"bold"}
                      color={"teal.500"}
                      pt={1}
                    >
                      {message.sender}
                    </Text>
                  )}
                  <Text
                    fontSize="xs"
                    mt={1}
                    textAlign="right"
                    color={
                      message.sender !== formData.username
                        ? "red.500"
                        : "red.500"
                    }
                  >
                    {message.time}
                  </Text>
                </Flex>
              </Box>
            </Flex>
          ))}
        </Stack>
      </Box>

      {/* Sticky Footer */}
      <Flex
        as="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleSendMessage();
        }}
        p={1}
        m={0}
        border={0}
        borderRadius={20}
        bg={inputBgColor}
        alignItems="center"
        justifyContent="center"
        position="sticky"
        bottom={50}
        zIndex="sticky"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message here..."
          variant="filled"
          size="sm"
          focusBorderColor="transparent"
          borderRadius={20}
          borderTopLeftRadius={0}
          borderBottomLeftRadius={0}
          bg={inputBgColor}
          color={inputColor}
          required
          _hover={inputBgColor}
        />
        <IconButton
          type="submit"
          aria-label="Send message"
          icon={<ArrowRightIcon />}
          borderRadius={20}
          bg={inputBgColor}
        />
      </Flex>
    </Box>
  );
};
export default ChatPage;
