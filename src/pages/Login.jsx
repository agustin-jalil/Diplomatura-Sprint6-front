import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 Importar el hook del contexto

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const toastRef = useRef(null);
  const navigate = useNavigate();

  const { login, logout } = useAuth(); // 👈 Usar login y logout desde el contexto

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await login({ username, password }); // 👈 Llama al login del contexto
      showToast('success', 'Login exitoso', 'Bienvenido');
      setTimeout(() => navigate('/'), 1500);
    } catch (err) {
      showToast('error', 'Error', 'Credenciales inválidas');
    }
  };


  const showToast = (type, title, message) => {
    if (!toastRef.current) return;
    toastRef.current.textContent = `${title}: ${message}`;
    toastRef.current.className = `login__toast login__toast--${type}`;
    toastRef.current.style.display = 'block';
    setTimeout(() => (toastRef.current.style.display = 'none'), 3000);
  };

  return (
    <div className="login container-general">
      <div ref={toastRef} className="login__toast"></div>
      <div className="login__card">
        <h2 className="login__title">Iniciar Sesión</h2>
        <form className="login__form" onSubmit={handleSubmit}>
          <div className="login__field">
            <label htmlFor="username" className="login__label">Nombre de usuario</label>
            <input
              id="username"
              type="text"
              className="login__input"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="login__field">
            <label htmlFor="password" className="login__label">Contraseña</label>
            <input
              id="password"
              type="password"
              className="login__input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login__button login__button--primary">
            Iniciar Sesión
          </button>
          <button
            type="button"
            className="login__button login__button--link"
            onClick={() => navigate('/register')}
          >
            ¿No tenés cuenta? Registrate
          </button>
          <a href="/">Volver al Home</a>
        </form>
      </div>
    </div>
  );
}
