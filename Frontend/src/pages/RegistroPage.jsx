import { useRef } from "react";
import FormularioRegistro from "../components/form/FormularioRegistro";
import MenuOpciones from "../components/options/MenuOpciones";
import { ListarEstudiantes } from "../components/listaEstudiantes/ListarEstudiantes";
import "./RegistroPage.css"; // Importa los estilos

// pagina donde vamos a realizar el registro de los estudiantes y donde vamos a mostras los 5 mejores ressultados de la jugada 
const RegistroPage = () => {
  const formRef = useRef();
  const manejarRegistro = () => {
    if (formRef.current) {
      formRef.current.registrar(); 
    }
  };
  

  return (
    <div className="registro-page">
      <MenuOpciones onRegistrar={manejarRegistro} />
      <div className="formulario-container-page">
        <FormularioRegistro ref={formRef} />
        <ListarEstudiantes/>
      </div>
    </div>
  );
};

export default RegistroPage;
