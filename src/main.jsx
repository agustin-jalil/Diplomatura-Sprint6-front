import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import 'primereact/resources/themes/lara-light-blue/theme.css'; // Puedes cambiar el tema
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';
import './index.css'
import App from './App.jsx'
import VideoBackground from './components/VideoBackground.jsx';
import Header from '../src/components/Header.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <VideoBackground>
      <App />
    </VideoBackground>
  </StrictMode>,
)
