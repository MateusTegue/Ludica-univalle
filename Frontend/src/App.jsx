import {BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import RegistroPage from './pages/RegistroPage';
import EstudianteJugada from './pages/ResultadoJuegoPage/ResultadoJuegoPage';
import ListaEstudiantePage from './pages/ListaEstudiantesPage/ListaEstudiantesPage';
import FiltrosPorEdadPage from './pages/filtrosPage/filtrosPorEdadPage'; 
import FiltrosPorCarreraPage from './pages/ResultadosPorCarrera/ResultadosPorCarreraPage';
import ResultadosPorCiudadPage from './pages/ResultadosPorCiudadPage/ResultadosPorCiudadPage';
import ResultadosPorSemestrePage from './pages/ResultadosPorSemestrePage/ResultadosPorSemestrePage';
import TotalEstudiantesPage from './pages/TatalEstudiantePage/TotalEstudiantePage';
import { Navegacion } from './components/header/Navegacion';
import './index.css';

// archivo en el cual definimos la rutas para la diferenres opciones que tenemos disponibles en el sistema 
function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<RegistroPage />} />
        <Route path="/estudiantes" element={<TotalEstudiantesPage />} />
        <Route path="/resultado" element={<EstudianteJugada />} />
        <Route path='/participantes' element={<ListaEstudiantePage />} />
        <Route path='/filtros-edad' element={<FiltrosPorEdadPage />} />
        <Route path='/filtros-carrera' element={<FiltrosPorCarreraPage />} />
        <Route path='/filtros-ciudad' element={<ResultadosPorCiudadPage />} />
        <Route path='/filtros-semestre' element={<ResultadosPorSemestrePage />} />
        {/* <Route path='/resulrados/estadisticos' element={<ResultadosEstadisticos/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
