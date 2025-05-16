import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSuperheroes } from "../context/SuperHeroContext";
import { useAuth } from "../context/AuthContext";

const EditSuperhero = () => {
  const { id } = useParams();
  const { getSuperheroById, updateSuperhero } = useSuperheroes();
  const { token } = useAuth();
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    power: "",
    image: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      const hero = await getSuperheroById(id);
      if (hero) {
        setFormData({
          name: hero.name,
          power: hero.power,
          image: hero.image || "",
        });
      }
      setLoading(false);
    };
    fetchData();
  }, [id, getSuperheroById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateSuperhero(id, formData, token);
    alert("Superhéroe actualizado correctamente");
  };

  if (loading) return <p className="editsuperheroe__loading">Cargando...</p>;

  return (
    <div className="editsuperheroe container-general">
       <div className="editsuperhero-card">
            <h1 className="editsuperheroe__title">Editar Superhéroe</h1>
            <form className="editsuperheroe__form" onSubmit={handleSubmit}>
                <label className="editsuperheroe__label">
                Nombre:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="editsuperheroe__input"
                    required
                />
                </label>

                <label className="editsuperheroe__label">
                Poder:
                <input
                    type="text"
                    name="power"
                    value={formData.power}
                    onChange={handleChange}
                    className="editsuperheroe__input"
                    required
                />
                </label>

                <label className="editsuperheroe__label">
                Imagen (URL):
                <input
                    type="text"
                    name="image"
                    value={formData.image}
                    onChange={handleChange}
                    className="editsuperheroe__input"
                />
                </label>

                <div className="editsuperheroe__buttons">
                <button type="submit" className="editsuperheroe__button editsuperheroe__button--save">
                    Guardar
                </button>
                </div>
            </form>
        </div> 
    </div>
  );
};

export default EditSuperhero;
