
import ReactDOM from "react-dom/client";
import "./index.css";
import {  RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./theme";
import router from "./routes/Routes.jsx";
import { io } from 'socket.io-client';
import { AppContext } from "./utils/CustomHooks.js"; 
export const socket = io.connect("http://localhost:3000");


ReactDOM.createRoot(document.getElementById("root")).render(
  <>
  <AppContext.Provider value={{socket}}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </AppContext.Provider>
  </>
);
