import React, { createContext, useState, useContext } from "react";
import API from "../api/axios"; // tu instancia de Axios


const SuperheroContext = createContext();

export const SuperheroProvider = ({ children }) => {
  const [superheroes, setSuperheroes] = useState([]);

  const getSuperheroes = async () => {
    try {
      const response = await API.get("/superheroes");
      console.log("Superhéroes obtenidos:", response.data);
      setSuperheroes(response.data);
    } catch (error) {
      console.error("Error al obtener los superhéroes:", error);
    }
  };

  const getSuperheroById = async (id) => {
    try {
      const response = await API.get(`/superheroes/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error al obtener el superhéroe:", error);
      return null;
    }
  };

  const createSuperhero = async (superheroData, token) => {
    try {
      const response = await API.post("/superheroes", superheroData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // ← ¡esto es necesario!
        },
      });
      setSuperheroes((prev) => [...prev, response.data]);
    } catch (error) {
      console.error("Error al crear el superhéroe:", error);
    }
  };

  const updateSuperhero = async (id, superheroData, token) => {
    try {
      const response = await API.put(`/superheroes/${id}`, superheroData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuperheroes((prev) =>
        prev.map((hero) =>
          hero._id === id ? response.data : hero
        )
      );
    } catch (error) {
      console.error("Error al actualizar el superhéroe:", error);
    }
  };

  const deleteSuperhero = async (id, token) => {
    try {
      await API.delete(`/superheroes/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSuperheroes((prev) => prev.filter((hero) => hero._id !== id));
    } catch (error) {
      console.error("Error al eliminar el superhéroe:", error);
    }
  };

  return (
    <SuperheroContext.Provider
      value={{
        superheroes,
        getSuperheroes,
        getSuperheroById,
        createSuperhero,
        updateSuperhero,
        deleteSuperhero,
      }}
    >
      {children}
    </SuperheroContext.Provider>
  );
};

export const useSuperheroes = () => useContext(SuperheroContext);
