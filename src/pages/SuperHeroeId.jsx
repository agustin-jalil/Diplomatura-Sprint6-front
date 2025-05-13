export const SuperHeroe = () => {
  return (
    <div className="container-general contenedores-flex">
      <div className="container-superhero">
        <img
          src="https://cdn.pixabay.com/photo/2023/02/13/02/34/spiderman-7786392_1280.jpg"
          alt="Superhéroe"
          className="superhero-image"
          width={600}
        />
        <div className="superhero-info">
          <h2 className="superhero-name">Nombre del Superhéroe</h2>
          <p className="superhero-description">Descripción del superhéroe.</p>
          <em className="superhero-creador">Creado por - nombre</em>
        </div>
      </div>
      <div className="container-superhero-buttons">
        <button className="superhero__buttons--crear">Crear</button>
        <button className="superhero__buttons--editar">Editar</button>
        <button className="superhero__buttons--eliminar">Eliminar</button>
      </div>
    </div>
  );
};
