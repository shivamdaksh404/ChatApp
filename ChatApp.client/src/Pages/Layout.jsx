import { Box } from "@chakra-ui/react";
import Header from "./Header";
//import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const Layout = () => {
  return (
  <>
   <Box display="flex" flexDirection="column" minHeight="100vh">
      <Header />
      <Box display="flex" flex="1">
        {/* <Sidebar /> */}
        <Box flex="1"  p={4}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  </>
  );
};

export default Layout;