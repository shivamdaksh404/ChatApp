import { createBrowserRouter } from "react-router-dom";
import ErrorPage from "../error";
import ChatBox from "../Pages/ChatPage/ChatBox";
import Login from "../authPage/Login";
import ProtectedRoutes from "../utils/ProtectedRoutes";
import PublicRoute from "../utils/PublicRoutes";
import Layout from "../Pages/Layout";

const router = createBrowserRouter([
 
  {
    path: "*",
    element: <h1>Page Not Found</h1>,
    },
    {
      path: "/login",
      element:<PublicRoute />,
      children:[
        {
          path:"",
          element:<Login />
          } 
          ]
  
    },
  
    {
      path: "/",
      element: <ProtectedRoutes />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "",
          element: <Layout />,
          children: [
            {
              path: "",
              element: <ChatBox />,
            }
          ]
        }
  
      ]
    }
]);

export default router;
