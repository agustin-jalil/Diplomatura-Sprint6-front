import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // 👈 Importar AuthContext

export default function Navbar() {
  const navigate = useNavigate();
  const { token, logout, user } = useAuth(); // 👈 Usar token y logout del contexto

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

      <div className="navbar-centro font-semibold">
        {!token ? (
          <a
            href="/login"
            className="cursor-pointer hover:text-yellow-400 transition-colors"
          >
            Login
          </a>
        ) : (
        <div className='flex gap-4'>

          <p> Bienvenido {user.username}!</p>
          <button
            onClick={() => {
              logout(); // 👈 Llamar logout desde el contexto
              navigate('/login'); // 👈 Redirigir después de logout
            }}
            className="cursor-pointer hover:text-yellow-400 transition-colors"
          >
            Logout
          </button>
        </div>
        )}
      </div>
    </nav>
  );
}
