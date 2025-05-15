import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

export default function Navbar() {
  const navigate = useNavigate();

  // Simulación del estado de login; reemplaza esto con tu lógica real
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simulación para cargar estado de login (puedes usar context o auth provider en un caso real)
  useEffect(() => {
    const token = localStorage.getItem('token'); // o la clave que uses
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); // limpia el token o datos de sesión
    setIsLoggedIn(false);
  };

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Creadores', path: '/creators' },
    { label: 'Crear', path: '/crearsuperheroe' },

  ];

  return (
    <nav className="navbar text-white h-20">
      <div className="navbar-centro gap-4">
        <img src="/batman.svg" width="48px" alt="Logo" />
        <ul className="flex gap-6 font-semibold navbar-centro">
          {menuItems.map((item) => (
            <li
              key={item.label}
              onClick={() => navigate(item.path)}
              className="cursor-pointer hover:text-yellow-400 transition-colors"
            >
              {item.label}
            </li>
          ))}
        </ul>
      </div>
        <div className='navbar-centro font-semibold'>
          {!isLoggedIn ? (
            <a
              href="/login"
              className="cursor-pointer hover:text-yellow-400 transition-colors"
            >
              Login
            </a>
          ) : (
            <button
              onClick={handleLogout}
              className="cursor-pointer hover:text-yellow-400 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
    </nav>
  );
}
