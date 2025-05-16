import React, { useState, useEffect } from 'react';
import { Button } from 'primereact/button';
import { useSuperheroes } from '../context/SuperHeroContext';
import Header from '../components/Header';
import { Link } from "react-router-dom";

export default function Superheroes() {
  const { superheroes, getSuperheroes } = useSuperheroes();
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const heroesPerPage = 6;

  useEffect(() => {
    getSuperheroes();
  }, []);

  // Asegúrate de que superheroes es un arreglo
  const filteredHeroes = (superheroes || []).filter(h =>
    `${h.name} ${h.alterEgo}`.toLowerCase().includes(filter.toLowerCase())
  );

  // Paginación
  const indexOfLastHero = currentPage * heroesPerPage;
  const indexOfFirstHero = indexOfLastHero - heroesPerPage;
  const currentHeroes = filteredHeroes.slice(indexOfFirstHero, indexOfLastHero);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredHeroes.length / heroesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="lista-superheroes container-general">
      <Header />
      <br />
      <input
        type="text"
        placeholder="Buscar superhéroe..."
        value={filter}
        onChange={(e) => {
          setFilter(e.target.value);
          setCurrentPage(1); // Reiniciar a la primera página al buscar
        }}
        className="lista-superheroes-input"
      />

      <div className="superheroes-list">
        {currentHeroes.length > 0 ? (
          currentHeroes.map(h => (
            <div key={h._id} className="superheroes-list__card">
              <img 
                src={h.image} // fallback
                alt={h.name}
                className="superheroes-list__image"
              />
              <div className="superheroes-list__content">
                <h3 className="superheroes-list__title">{h.name}</h3>
                <Link to={`/superheroes/${h._id}`}>
                  <button className="superheroes-list__button">Ver más</button>
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="superheroes-list__empty">No se encontraron superhéroes.</p>
        )}
      </div>

      <div className="flex justify-center mt-6">
        <ul className="flex gap-2">
          {pageNumbers.map(number => (
            <li key={number}>
              <Button
                label={String(number)}
                onClick={() => paginate(number)}
                className={`p-button-rounded p-button-text ${currentPage === number ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
