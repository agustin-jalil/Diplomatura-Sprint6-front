import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
// import { AuthProvider } from './context/AuthContest';
// import { CreatorProvider } from './context/CreatorContext';
// import { SuperheroProvider } from './context/SuperHeroContext';

function App() {
  return (
    // <AuthProvider> 
    //   <CreatorProvider> 
    //     <SuperheroProvider> 
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
    //     </SuperheroProvider>
    //   </CreatorProvider>
    // </AuthProvider>
  );
}

export default App;
