import { useState, useRef } from 'react';
import { useSuperheroes } from '../context/SuperHeroContext';
import { useNavigate } from 'react-router-dom';

export default function CreateSuperheroe() {
  const [name, setName] = useState('');
  const [power, setPower] = useState('');
  const [image, setImage] = useState('');
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const { createSuperhero } = useSuperheroes();

  const showToast = (type, title, message) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = `${title}: ${message}`;
    toastRef.current.className = `crearsuperheroe__toast crearsuperheroe__toast--${type}`;
    toastRef.current.style.display = 'block';
    setTimeout(() => (toastRef.current.style.display = 'none'), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image.startsWith('http')) {
      showToast('error', 'Error', 'La URL de la imagen no es válida');
      return;
    }

    const superheroData = {
      name,
      power,
      image,
    };

    try {
      const token = localStorage.getItem('token');
      console.log("Enviando superhéroe:", superheroData);
      await createSuperhero(superheroData, token);
      showToast('success', 'Superhéroe creado', 'Se agregó correctamente');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      showToast('error', 'Error', 'No se pudo crear el superhéroe');
    }
  };

  return (
    <div className="crearsuperheroe container-general">
      <div ref={toastRef} className="crearsuperheroe__toast"></div>
      <div className="crearsuperheroe__card">
        <h2 className="crearsuperheroe__title">Crear Superhéroe</h2>
        <form className="crearsuperheroe__form" onSubmit={handleSubmit}>
          <div className="crearsuperheroe__field">
            <label htmlFor="name" className="crearsuperheroe__label">Nombre</label>
            <input
              id="name"
              type="text"
              className="crearsuperheroe__input"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="crearsuperheroe__field">
            <label htmlFor="power" className="crearsuperheroe__label">Poder</label>
            <textarea
              id="power"
              className="crearsuperheroe__input crearsuperheroe__input--textarea"
              rows="3"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              required
            />
          </div>

          <div className="crearsuperheroe__field">
            <label htmlFor="image" className="crearsuperheroe__label">URL de imagen</label>
            <input
              id="image"
              type="text"
              className="crearsuperheroe__input"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="crearsuperheroe__button crearsuperheroe__button--primary">
            Crear Superhéroe
          </button>
        </form>
      </div>
    </div>
  );
}
