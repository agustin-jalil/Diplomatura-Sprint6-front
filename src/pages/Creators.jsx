import React, { useEffect, useState } from "react";

const CreatorsList = () => {
  const [creators, setCreators] = useState([]);

  useEffect(() => {
    const mockCreators = [
      {
        _id: "1",
        name: "Stan Lee",
        email: "stanlee@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 60,
      },
      {
        _id: "2",
        name: "Bob Kane",
        email: "bobkane@dc.com",
        company: "DC Comics",
        yearsOfExperience: 45,
      },
      {
        _id: "3",
        name: "Jack Kirby",
        email: "jackkirby@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 50,
      },
      {
        _id: "4",
        name: "Jerry Siegel",
        email: "jerry@dc.com",
        company: "DC Comics",
        yearsOfExperience: 40,
      },
      {
        _id: "5",
        name: "Steve Ditko",
        email: "steveditko@marvel.com",
        company: "Marvel Comics",
        yearsOfExperience: 42,
      },
    ];

    setTimeout(() => {
      setCreators(mockCreators);
    }, 500);
  }, []);

  return (
    <div className="creadores container-general">
      <div className="creadores__container">
        <h1 className="creadores__title">Creadores</h1>

        {creators.length === 0 ? (
          <p className="creadores__loading">Cargando creadores...</p>
        ) : (
          <div className="creadores__grid">
            {creators.map((creator) => (
              <div key={creator._id} className="creadores__card">
                <h2 className="creadores__name">{creator.name}</h2>
                <p className="creadores__info">Email: {creator.email}</p>
                <p className="creadores__info">Empresa: {creator.company}</p>
                <p className="creadores__info">
                  Experiencia: {creator.yearsOfExperience} años
                </p>
                <div className="creadores__botones">
                  <button className="creadores__boton--crear" title="Crear">➕</button>
                  <button className="creadores__boton--editar" title="Editar">✏️</button>
                  <button className="creadores__boton--eliminar" title="Eliminar">🗑️</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CreatorsList;
