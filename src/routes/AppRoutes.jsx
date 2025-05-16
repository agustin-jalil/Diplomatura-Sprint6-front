import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Register from '../pages/Register';
import Superheroes from '../pages/Superheroes';
import CreatorsList from '../pages/Creators';
import SuperheroDetail from '../pages/SuperHeroeId';
import CreateSuperheroe from '../pages/CreateSuperhereo';
import EditSuperhero from '../pages/EditSuperhereo';



export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Superheroes />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/creators" element={<CreatorsList />} />
      <Route path="/superheroes/:id" element={<SuperheroDetail />} />
      <Route path="/crearsuperheroe" element={<CreateSuperheroe />} />
      <Route path="/editsuperhero/:id" element={<EditSuperhero />} />
    </Routes>
  );
}
