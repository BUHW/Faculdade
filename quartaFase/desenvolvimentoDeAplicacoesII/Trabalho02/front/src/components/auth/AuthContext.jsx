import React, { createContext, useCallback, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [userId, setUserId] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('username');
    const storedUserId = localStorage.getItem('userID');
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
      setUserId(storedUserId);
    }
    setIsLoading(false);
  }, []);

  const login = useCallback((token, username, userId) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      localStorage.setItem('userID', userId);
      setIsAuthenticated(true);
      setUsername(username);
      setUserId(userId);
      setError(null);
    } catch (e) {
      setError('Failed to login');
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('userID');
      setIsAuthenticated(false);
      setUsername('');
      setUserId('');
      setError(null);
    } catch (e) {
      setError('Failed to logout');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, isLoading, username, userId, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;