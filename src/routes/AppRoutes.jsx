import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Superheroes from '../pages/Superheroes';
import CreatorsList from '../pages/Creators';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Superheroes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/creators" element={<CreatorsList />} />
    </Routes>
  );
}
