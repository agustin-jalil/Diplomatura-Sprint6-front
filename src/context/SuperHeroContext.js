import React, { createContext, useState, useContext } from "react";
import axios from "axios";

// URL base de la API
const API_URL = "http://localhost:3000/api/superheros";

// Crear el contexto
const SuperheroContext = createContext();

// Proveedor del contexto
export const SuperheroProvider = ({ children }) => {
  const [superheroes, setSuperheroes] = useState([]);

  // Obtener los superhéroes
  const getSuperheroes = async () => {
    try {
      const response = await axios.get(API_URL);
      setSuperheroes(response.data.superheroes);
    } catch (error) {
      console.error("Error al obtener los superhéroes:", error);
    }
  };

  // Crear un nuevo superhéroe
  const createSuperhero = async (superheroData, token) => {
    try {
      const response = await axios.post(
        API_URL,
        superheroData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuperheroes((prevSuperheroes) => [
        ...prevSuperheroes,
        response.data.superhero,
      ]);
    } catch (error) {
      console.error("Error al crear el superhéroe:", error);
    }
  };

  // Actualizar un superhéroe
  const updateSuperhero = async (id, superheroData, token) => {
    try {
      const response = await axios.put(
        `${API_URL}/${id}`,
        superheroData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSuperheroes((prevSuperheroes) =>
        prevSuperheroes.map((superhero) =>
          superhero._id === id ? response.data.superhero : superhero
        )
      );
    } catch (error) {
      console.error("Error al actualizar el superhéroe:", error);
    }
  };

  // Eliminar un superhéroe
  const deleteSuperhero = async (id, token) => {
    try {
      await axios.delete(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuperheroes((prevSuperheroes) =>
        prevSuperheroes.filter((superhero) => superhero._id !== id)
      );
    } catch (error) {
      console.error("Error al eliminar el superhéroe:", error);
    }
  };

  return (
    <SuperheroContext.Provider
      value={{
        superheroes,
        getSuperheroes,
        createSuperhero,
        updateSuperhero,
        deleteSuperhero,
      }}
    >
      {children}
    </SuperheroContext.Provider>
  );
};

// Custom Hook para acceder al contexto de superhéroes
export const useSuperheroes = () => useContext(SuperheroContext);
