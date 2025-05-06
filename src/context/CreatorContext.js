import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:3000/api/creators";

// Crear el contexto
const CreatorContext = createContext();

// Proveedor del contexto
export const CreatorProvider = ({ children }) => {
  const [creators, setCreators] = useState([]);
  
  // Obtener los creadores
  const getCreators = async () => {
    try {
      const response = await axios.get(API_URL);
      setCreators(response.data.creators);
    } catch (error) {
      console.error("Error al obtener los creadores:", error);
    }
  };

  // Crear un nuevo creador
  const createCreator = async (creatorData, token) => {
    try {
      const response = await axios.post(
        API_URL,
        creatorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreators((prevCreators) => [...prevCreators, response.data.creator]);
    } catch (error) {
      console.error("Error al crear el creador:", error);
    }
  };

  // Actualizar creador
  const updateCreator = async (id, creatorData, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        creatorData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCreators((prevCreators) =>
        prevCreators.map((creator) =>
          creator._id === id ? response.data.creator : creator
        )
      );
    } catch (error) {
      console.error("Error al actualizar el creador:", error);
    }
  };

  // Eliminar creador
  const deleteCreator = async (id, token) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCreators((prevCreators) =>
        prevCreators.filter((creator) => creator._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el creador:", error);
    }
  };

  return (
    <CreatorContext.Provider
      value={{
        creators,
        getCreators,
        createCreator,
        updateCreator,
        deleteCreator,
      }}
    >
      {children}
    </CreatorContext.Provider>
  );
};

// Custom Hook para acceder al contexto de creadores
export const useCreators = () => useContext(CreatorContext);
