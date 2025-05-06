import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:3000/api";

// Crear el contexto
const AuthContext = createContext();

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);

  // Registrar un nuevo usuario
  const register = async (userData) => {
    try {
      const response = await axios.post(`${API_URL}/auth/register`, userData);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  // Login de usuario
  const login = async (credentials) => {
    try {
      const response = await axios.post(`${API_URL}/auth/login`, credentials);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al hacer login:", error);
    }
  };

  // Logout
  const logout = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, token, register, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook para acceder al contexto
export const useAuth = () => useContext(AuthContext);
