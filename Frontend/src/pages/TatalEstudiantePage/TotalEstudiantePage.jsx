import { useRef } from "react";
import React from "react";
import MenuOpciones from "../../components/options/MenuOpciones";
import { TotalEstudiantes } from "../../components/totalEstudiantes/TotalEstudiantes";
import "./TotalEstudiante.css"; 

const TotalEstudiantesPage = () => {
  return (
    <div className="total-estudiante-page">
      <MenuOpciones />
      <div className="container-page">
        <TotalEstudiantes/>
      </div>
    </div>
  );
};

export default TotalEstudiantesPage;