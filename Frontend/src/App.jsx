import {BrowserRouter, Routes, Route, Navigate  } from 'react-router-dom';
import RegistroPage from './pages/RegistroPage';
import EstudianteJugada from './pages/ResultadoJuegoPage/ResultadoJuegoPage';
import  MenuOpciones  from './components/options/MenuOpciones';
import { TotalEstudiantes } from './components/totalEstudiantes/TotalEstudiantes';
import { Navegacion } from './components/header/Navegacion';
import './index.css';

// archivo en el cual definimos la rutas para la diferenres opciones que tenemos disponibles en el sistema 
function App() {
  return (
    <BrowserRouter>
      <Navegacion />
      <MenuOpciones />
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home" element={<RegistroPage />} />
        <Route path="/estudiantes" element={<TotalEstudiantes />} />
        <Route path="/resultado" element={<EstudianteJugada />} />
        {/* <Route path='/resulrados/estadisticos' element={<ResultadosEstadisticos/>} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App
