import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Superheroes from '../pages/Superheroes';
import CreatorsList from '../pages/Creators';
import { SuperHeroe } from '../pages/SuperHeroeId';
import CreateSuperheroe from '../pages/CreateSuperhereo';


export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Superheroes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/creators" element={<CreatorsList />} />
      <Route path="/superheroe" element={<SuperHeroe />} />
      <Route path="/crearsuperheroe" element={<CreateSuperheroe />} />
    </Routes>
  );
}
