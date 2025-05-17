import MenuOpciones from "../../components/options/MenuOpciones";
import { useRef } from "react";
import { EstadisticasJugadas } from "../../components/resultadoJuego/ResultadoJuego";

// pagina el la cual se va a mostrar la estadistica del juego 
const EstudianteJugada = () => {
    const formRef = useRef();
    const manejarRegistro = () => {
      if (formRef.current) {
        formRef.current.registrar(); 
      }
    };
    return (
      <div className="total-estudiante-page">
        <MenuOpciones onRegistrar={manejarRegistro} />
        <div className="formulario-container">
          <EstadisticasJugadas/>
        </div>
      </div>
    );
  };
  
  export default EstudianteJugada;