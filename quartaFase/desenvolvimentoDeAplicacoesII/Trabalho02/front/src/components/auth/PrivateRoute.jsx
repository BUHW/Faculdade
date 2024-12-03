import { CircularProgress } from '@mui/material';
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <CircularProgress />
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
