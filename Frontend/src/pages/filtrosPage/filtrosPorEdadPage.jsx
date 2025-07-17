import React from "react";
import FiltroPorEdad from "../../components/resultadosPorEdad/resultadosPorEdad";
import './FiltroPorEdad.css'
import MenuOpciones from "../../components/options/MenuOpciones";

const FiltrosPorEdadPage = () => {
    return (
        <div className="filto-container">
            <MenuOpciones  />
            <div className="filtro-estudiantes">     
              <FiltroPorEdad />
            </div>
        </div>
    )
}


export default FiltrosPorEdadPage;