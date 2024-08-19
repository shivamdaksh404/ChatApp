/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

export default function ProtectedRoutes() {
  const isAuthenticated = localStorage.getItem("isLogin");

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
}