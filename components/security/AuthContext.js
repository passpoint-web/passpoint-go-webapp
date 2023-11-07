'use client'
import { getToken, saveToken, setLogout } from "@/services/localService";
import React, { createContext, useState, useEffect } from "react";
const AuthContext = createContext(); // create context here

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const hasAccess = getToken()
    if (hasAccess) {
      setIsAuthenticated(true);
    }
  }, []);

  const loginUser = (token) => {
    saveToken( token)
    setIsAuthenticated(true);
  };

  const logoutUser = () => {
    setLogout()
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthProvider };
