// src/context/AuthContext.jsx

import React, { createContext, useState, useContext } from "react";
import API from "../api/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [users, setUsers] = useState([]);

  const register = async (userData) => {
    try {
      const response = await API.post("/auth/register", userData);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al registrar el usuario:", error);
    }
  };

  const login = async (credentials) => {
    try {
      const response = await API.post("/auth/login", credentials);
      const { token } = response.data;
      setToken(token);
      localStorage.setItem("token", token);
    } catch (error) {
      console.error("Error al hacer login:", error);
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  const getAllUsers = async () => {
    console.log("🔍 getAllUsers() fue llamado");
    console.log("🔑 Token actual:", token);

    try {
      const response = await API.get("/auth/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ Usuarios recibidos del backend:", response.data);
      setUsers(response.data);
    } catch (error) {
      console.error("❌ Error al obtener los usuarios:", error);

      // Opcional: muestra detalles si el servidor responde con algo
      if (error.response) {
        console.error("🧾 Respuesta del servidor:", error.response.data);
        console.error("📡 Status:", error.response.status);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        users,
        register,
        login,
        logout,
        getAllUsers,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook seguro
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
};
