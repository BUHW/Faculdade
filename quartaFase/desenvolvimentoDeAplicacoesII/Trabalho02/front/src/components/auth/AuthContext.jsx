import React, { createContext, useCallback, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUsername = localStorage.getItem('nome');
    if (token) {
      setIsAuthenticated(true);
      setUsername(storedUsername);
    }
    setIsLoading(false);
  }, []);

  const loginSite = useCallback((token, username) => {
    try {
      localStorage.setItem('token', token);
      localStorage.setItem('nome', username);
      setIsAuthenticated(true);
      setUsername(username);
      setError(null);
    } catch (e) {
      setError('Failed to login');
    }
  }, []);

  const logout = useCallback(() => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('nome');
      setIsAuthenticated(false);
      setUsername('');
      setError(null);
    } catch (e) {
      setError('Failed to logout');
    }
  }, []);

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginSite, logout, isLoading, username, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;