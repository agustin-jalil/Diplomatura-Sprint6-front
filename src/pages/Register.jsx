import { useState, useRef } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/auth/register', formData);
      showToast('success', 'Registro exitoso', 'Usuario creado correctamente');
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      showToast('error', 'Error', 'No se pudo registrar el usuario');
    }
  };

  const showToast = (type, title, message) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = `${title}: ${message}`;
    toastRef.current.className = `registrarse__toast registrarse__toast--${type}`;
    toastRef.current.style.display = 'block';
    setTimeout(() => (toastRef.current.style.display = 'none'), 3000);
  };

  return (
    <div className="registrarse container-general">
      <div ref={toastRef} className="registrarse__toast"></div>
      <div className="registrarse__card">
        <h2 className="registrarse__title">Registrarse</h2>
        <form className="registrarse__form" onSubmit={handleSubmit}>
          <div className="registrarse__field">
            <label htmlFor="username" className="registrarse__label">Nombre de usuario</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
              className="registrarse__input"
            />
          </div>
          <div className="registrarse__field">
            <label htmlFor="password" className="registrarse__label">Contraseña</label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="registrarse__input"
            />
          </div>
          <button type="submit" className="registrarse__button">Registrarse</button>
        </form>
      </div>
    </div>
  );
}
