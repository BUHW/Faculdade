import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import Progress from '../layout/Progress';
import AuthContext from './AuthContext';

export default function PrivateRoute({ children }) {
  const { isAuthenticated, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Progress />
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}
