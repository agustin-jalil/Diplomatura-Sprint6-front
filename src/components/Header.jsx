import { useNavigate } from 'react-router-dom';

export default function Navbar() {
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Home', path: '/' },
    { label: 'Registro', path: '/register' },
    { label: 'Login', path: '/login' },
    { label: 'Creadores', path: '/creators' },
  ];

  return (
    <nav className="w-full text-white h-20 bg-black">
      <div
        className="flex justify-between items-center h-full gap-4 max-w-7xl mx-auto px-4"
        style={{ alignItems: 'center' }} // Corrected this
      >
        <img src="/batman.svg" width="48px" alt="Logo" />
        <ul className="flex gap-6 font-semibold">
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
    </nav>
  );
}
