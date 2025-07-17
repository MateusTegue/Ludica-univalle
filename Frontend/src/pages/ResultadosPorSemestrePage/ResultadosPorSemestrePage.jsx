import React from "react";
import ResultadosPorSemestre from "../../components/ResultadosPorSemestre/ResultadosPorSemestre";
import './ResultadosPorSemestrePage.css'
import MenuOpciones from "../../components/options/MenuOpciones";

const ResultadosPorSemestrePage = () => {
    return (
        <div className="filto-container">
            <MenuOpciones  />
            <div className="filtro-estudiantes">     
              <ResultadosPorSemestre />
            </div>
        </div>
    )
}


export default ResultadosPorSemestrePage;