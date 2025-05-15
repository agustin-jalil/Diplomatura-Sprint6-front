import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext"; // Asegúrate de que la ruta sea correcta

const CreatorsList = () => {
  const { getAllUsers, users } = useAuth(); // Ya es seguro por el throw en el hook
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
      setLoading(false);
    };

    fetchUsers();
  }, []);

  const nonAdminUsers = users?.filter(user => user.role !== "admin") || [];

  return (
    <div className="creadores container-general">
      <div className="creadores__container">
        <h1 className="creadores__title">Creadores</h1>

        {loading ? (
          <p className="creadores__loading">Cargando creadores...</p>
        ) : (
          <div className="creadores__grid">
            {nonAdminUsers.length === 0 ? (
              <p>No se encontraron creadores.</p>
            ) : (
              nonAdminUsers.map((creator) => (
                <div key={creator._id} className="creadores__card">
                  <p className="creadores__info">Email: {creator.username}</p>
                  <div className="creadores__botones">
                    <button className="creadores__boton--crear" title="Crear">➕</button>
                    <button className="creadores__boton--editar" title="Editar">✏️</button>
                    <button className="creadores__boton--eliminar" title="Eliminar">🗑️</button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorsList;
