import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import { SuperheroProvider } from './context/SuperHeroContext'; // Importar el proveedor del contexto
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <SuperheroProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </SuperheroProvider>
    </AuthProvider>
  );
}

export default App;
