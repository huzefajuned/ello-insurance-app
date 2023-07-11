import React, { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if access token exists in AsyncStorage
    const checkAccessToken = async () => {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          setAccessToken(token);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    checkAccessToken();
  }, []);

  const setToken = (token) => {
    setAccessToken(token);
    AsyncStorage.setItem("access_token", token);
  };

  const removeToken = () => {
    setAccessToken(null);
    AsyncStorage.removeItem("access_token");
  };

  return (
    <AuthContext.Provider
      value={{ accessToken, setToken, removeToken, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
