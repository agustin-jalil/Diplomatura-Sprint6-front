import React, { useState } from 'react';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import VideoBackground from '../components/VideoBackground';
import Header from '../components/Header';

export default function Superheroes() {
  const [filter, setFilter] = useState('');  // El estado de búsqueda
  const [currentPage, setCurrentPage] = useState(1); // Página actual
  const heroesPerPage = 6; // Héroes por página

  const heroes = [
    { _id: '1', name: 'Spider-Man', alterEgo: 'Peter Parker', description: 'Agility, Wall Crawling, Spidey Sense' },
    { _id: '2', name: 'Iron Man', alterEgo: 'Tony Stark', description: 'High-tech armor, Genius intellect' },
    { _id: '3', name: 'Captain America', alterEgo: 'Steve Rogers', description: 'Super strength, Shield' },
    { _id: '4', name: 'Black Widow', alterEgo: 'Natasha Romanoff', description: 'Super agility, Hand-to-hand combat skills' },
    { _id: '5', name: 'Thor', alterEgo: 'Thor Odinson', description: 'Super strength, Control of lightning' },
    { _id: '6', name: 'Hulk', alterEgo: 'Bruce Banner', description: 'Super strength, Regeneration' },
    { _id: '7', name: 'Black Panther', alterEgo: 'T’Challa', description: 'Super strength, Enhanced senses' },
    { _id: '8', name: 'Doctor Strange', alterEgo: 'Stephen Strange', description: 'Master of the mystic arts' },
  ];

  // Filtrado por nombre o alter ego
  const filteredHeroes = heroes.filter(h =>
    `${h.name} ${h.alterEgo}`.toLowerCase().includes(filter.toLowerCase())
  );

  // Calculamos los héroes de la página actual
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  // Cambiar de página
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Número total de páginas
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredHeroes.length / heroesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    // <VideoBackground>
      <div className="lista-superheroes container-general py-2">
        <Header />
        <br />
        <input
          type="text"
          placeholder="Buscar superhéroe..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="lista-superheroes-input"
        />

        <div className="superheroes-list">
          {currentHeroes.map(h => (
            <div key={h._id} className="superheroes-list__card">
              <img 
                src="https://cdn.pixabay.com/photo/2023/02/13/02/34/spiderman-7786392_1280.jpg"
                alt={h.name}
                className="superheroes-list__image"
              />
              <div className="superheroes-list__content">
                <h3 className="superheroes-list__title">{h.name}</h3>
                <h4 className="superheroes-list__subtitle">Alter Ego: {h.alterEgo}</h4>
                <p className="superheroes-list__description">{h.description}</p>
                <button className="superheroes-list__button">
                  Ver más
                </button>
              </div>
            </div>
          ))}

          {filteredHeroes.length === 0 && (
            <p className="superheroes-list__empty">No se encontraron superhéroes.</p>
          )}
        </div>


        {/* Paginación */}
        <div className="flex justify-center mt-6">
          <ul className="flex gap-2">
            {pageNumbers.map(number => (
              <li key={number}>
                <Button
                  label={number}
                  onClick={() => paginate(number)}
                  className={`p-button-rounded p-button-text ${currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    // </VideoBackground>
  );
}
