import React from "react";
import ResultadosPorCiudad from "../../components/ResultadosPorCiudad/ResultadosPorCiudad";
import './ResultadosPorCiudad.css'
import MenuOpciones from "../../components/options/MenuOpciones";

const ResultadosPorCiudadPage = () => {
    return (
        <div className="filto-container">
            <MenuOpciones  />
            <div className="filtro-estudiantes">     
              <ResultadosPorCiudad />
            </div>
        </div>
    )
}


export default ResultadosPorCiudadPage;