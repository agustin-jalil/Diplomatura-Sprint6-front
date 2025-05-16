import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const CreatorsList = () => {
  const { getAllUsers, users, deleteUser, user: currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      await getAllUsers();
      setLoading(false);
    };
    fetchUsers();
  }, []);

  const nonAdminUsers = users?.filter((user) => user.role !== "admin") || [];

  const handleDelete = async (id) => {
    const confirm = window.confirm("¿Estás seguro de eliminar este usuario y sus superhéroes?");
    if (confirm) {
      await deleteUser(id);
    }
  };
  const handleEdit = (id) => {
    navigate(`/edituser/${id}`);
  };

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
                    {currentUser?.role === "admin" && (
                      <button
                        className="creadores__boton--eliminar"
                        title="Eliminar"
                        onClick={() => handleDelete(creator._id)}
                      >
                        🗑️
                      </button>
                    )}
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
