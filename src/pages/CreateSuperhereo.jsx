import { useState, useRef } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function CreateSuperheroe() {
  const [name, setName] = useState('');
  const [abilities, setAbilities] = useState('');
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState('Ningún archivo seleccionado');
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const showToast = (type, title, message) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = `${title}: ${message}`;
    toastRef.current.className = `crearsuperheroe__toast crearsuperheroe__toast--${type}`;
    toastRef.current.style.display = 'block';
    setTimeout(() => (toastRef.current.style.display = 'none'), 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      showToast('error', 'Error', 'Debes subir una imagen');
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('abilities', abilities);
    formData.append('image', image);

    try {
      await API.post('/superheroes', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      showToast('success', 'Superhéroe creado', 'Se agregó correctamente');
      setTimeout(() => navigate('/superheroes'), 2000);
    } catch (err) {
      showToast('error', 'Error', 'No se pudo crear el superhéroe');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setImageName(file ? file.name : 'Ningún archivo seleccionado');
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
            <label htmlFor="abilities" className="crearsuperheroe__label">Habilidades</label>
            <textarea
              id="abilities"
              className="crearsuperheroe__input crearsuperheroe__input--textarea"
              rows="3"
              value={abilities}
              onChange={(e) => setAbilities(e.target.value)}
              required
            />
          </div>

          <div className="crearsuperheroe__field">
            <label className="crearsuperheroe__label">Foto</label>
            <label className="crearsuperheroe__file-label">
              Subir imagen
              <input
                type="file"
                accept="image/*"
                className="crearsuperheroe__file-input"
                onChange={handleImageChange}
              />
            </label>
            <span className="crearsuperheroe__file-name">{imageName}</span>
          </div>

          <button type="submit" className="crearsuperheroe__button crearsuperheroe__button--primary">
            Crear Superhéroe
          </button>
        </form>
      </div>
    </div>
  );
}
