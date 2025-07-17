import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MenuOpciones.css';

const MenuOpciones = ({ onRegistrar }) => {
  const navigate = useNavigate(); // <-- Hook de navegación

  const irAFiltrosPorEdad = () => {
    navigate('/filtros-edad');
  };
  const irAFiltrosPorCarrera = () => {
    navigate('/filtros-carrera');
  };
  const irAFiltrosPorCiudad = () => {
    navigate('/filtros-ciudad');
  };
  const irAFiltrosPorSemestre = () => {
    navigate('/filtros-semestre');
  };

  return (
    <aside className="menu-opciones">
      <h2>Opciones</h2>
      <div>
        <button onClick={irAFiltrosPorSemestre}>Resultado Semest...</button>
        <button onClick={irAFiltrosPorCiudad}>Resultado Por Ciudad</button>
        <button onClick={irAFiltrosPorEdad}>Resultado por Edad</button> 
        <button onClick={irAFiltrosPorCarrera}>Resultado por Carrera</button>
      </div>
    </aside>
  );
};

export default MenuOpciones;
