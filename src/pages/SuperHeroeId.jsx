import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // ← AÑADIDO
import { useSuperheroes } from "../context/SuperHeroContext";
import { useAuth } from "../context/AuthContext";
import Header from "../components/Header";

const SuperheroDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // ← AÑADIDO
  const { getSuperheroById, deleteSuperhero } = useSuperheroes(); // ← deleteSuperhero añadido por si lo usás
  const { user, token } = useAuth();
  const [superhero, setSuperhero] = useState(null);

  useEffect(() => {
    const fetchHero = async () => {
      const data = await getSuperheroById(id);
      console.log("🦸‍♂️ Superhéroe cargado:", data);
      console.log("👤 Owner:", data.owner);
      setSuperhero(data);
    };
    fetchHero();
  }, [id, getSuperheroById]);

  if (!superhero) return <p className="loading">Cargando superhéroe...</p>;

  const canEdit =
    user?.role === "admin" || user?.username === superhero.owner?.username;

  const handleEdit = () => {
    navigate(`/editsuperhero/${superhero._id}`);
  };

  const handleDelete = async () => {
    if (window.confirm("¿Estás seguro de que deseas eliminar este superhéroe?")) {
      await deleteSuperhero(superhero._id, token);
      navigate("/"); // o donde prefieras redirigir después de borrar
    }
  };

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
          <h4 className="superhero-creador">
            Alter Ego: {superhero.owner?.username || "Desconocido"}
          </h4>
          <p className="superhero-description">{superhero.description}</p>

          {canEdit && (
            <div className="container-superhero-buttons">
              <button className="superhero__buttons--editar" onClick={handleEdit}>
                Editar
              </button>
              <button className="superhero__buttons--eliminar" onClick={handleDelete}>
                Eliminar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuperheroDetail;
