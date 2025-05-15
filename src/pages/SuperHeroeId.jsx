import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSuperheroes } from "../context/SuperHeroContext";
import Header from "../components/Header";

const SuperheroDetail = () => {
  const { id } = useParams();
  const { getSuperheroById } = useSuperheroes();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const data = await getSuperheroById(id);
      setSuperhero(data);
    };
    fetchHero();
  }, [id, getSuperheroById]);

  if (!superhero) return <p className="loading">Cargando superhéroe...</p>;

  return (
    <div className="container-general">
      <Header />
      <div className="container-superhero">
        <img
          src={
            superhero.image ||
            "https://cdn.pixabay.com/photo/2023/02/13/02/34/spiderman-7786392_1280.jpg"
          }
          alt={superhero.name}
          width={600}
          className="superhero-image"
        />
        <div className="superhero-info">
          <h2 className="superhero-name">{superhero.name}</h2>
          <h4 className="superhero-creador">Alter Ego: {superhero.alterEgo}</h4>
          <p className="superhero-description">{superhero.description}</p>
          <p><strong>Poder:</strong> {superhero.power}</p>
          <p><strong>Ciudad:</strong> {superhero.city}</p>

          <div className="container-superhero-buttons">
            <button className="superhero__buttons--crear">Crear</button>
            <button className="superhero__buttons--editar">Editar</button>
            <button className="superhero__buttons--eliminar">Eliminar</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;
