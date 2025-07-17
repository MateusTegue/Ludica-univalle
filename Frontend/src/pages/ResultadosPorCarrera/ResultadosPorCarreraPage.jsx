import React from "react";
import FiltroPorCarrera from "../../components/resultadosPorCarrera/resultadosPorCarrera";
import './ResultadosPorCarreraPage.css'
import MenuOpciones from "../../components/options/MenuOpciones";

const FiltrosPorCarreraPage = () => {
    return (
        <div className="filto-container">
            <MenuOpciones  />
            <div className="filtro-estudiantes">     
              <FiltroPorCarrera />
            </div>
        </div>
    )
}


export default FiltrosPorCarreraPage;