import MenuOpciones from "../../components/options/MenuOpciones";
import { useRef } from "react";
import { EstadisticasJugadas } from "../../components/resultadoJuego/ResultadoJuego";
import './ResultadoJuegoPage.css'

// pagina el la cual se va a mostrar la estadistica del juego 
const EstudianteJugada = () => {
    const formRef = useRef();
    const manejarRegistro = () => {
      if (formRef.current) {
        formRef.current.registrar(); 
      }
    };
    return (
      <div className="resultado-estudiante-page">
        <MenuOpciones onRegistrar={manejarRegistro} />
        <div className="resultado-container">
          <EstadisticasJugadas/>
        </div>
      </div>
    );
  };
  
  export default EstudianteJugada;