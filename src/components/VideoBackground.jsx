import React from 'react';
import '../video.css'; // Asegurate de crear este archivo

export default function VideoBackground({children}) {
  return (
    <div className="video-container">
      <video autoPlay loop muted className="video-background">
        <source src="https://cdn.pixabay.com/video/2018/08/26/17969-287009565_large.mp4" type="video/mp4" />
        Tu navegador no soporta el video de fondo.
      </video>
      {children}
    </div>
  );
}
