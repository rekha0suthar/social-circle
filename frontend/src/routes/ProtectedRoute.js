import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
  const { isLogged } = useContext(UserContext);
  return isLogged ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
