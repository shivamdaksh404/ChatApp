
// Utils/PublicRoute.jsx
/* eslint-disable react/prop-types */
import { Navigate, Outlet } from 'react-router-dom';


// Utility function to check authentication

export default function PublicRoute() {

  return isAuthenticated() ? <Navigate to="/" /> : <Outlet />;
 } 
 
 
 const isAuthenticated = () => {
    return localStorage.getItem("isLogin");
  };

