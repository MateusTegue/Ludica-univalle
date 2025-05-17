import { useRef } from "react";
import MenuOpciones from "../../components/options/MenuOpciones";
import { TotalEstudiantes } from "../../components/totalEstudiantes/TotalEstudiantes";
import "./TotalEstudiante.css"; // Importa los estilos

// pagina donde vamos a tener el resumen general de todos los estudiantes 
const RegistroPage = () => {
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
        <TotalEstudiantes/>
      </div>
    </div>
  );
};

export default RegistroPage;