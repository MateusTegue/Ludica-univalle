import React from "react";
import ListaEstudiantesTable from "../../components/lisataEstudiantes/ListaEstudiantesTable";
import MenuOpciones from "../../components/options/MenuOpciones";
import './ListaEstudiantesPage.css'


const ListaEstudiantePage = () => {
  return (
    <div className="pagina-estudiantes">
      <MenuOpciones />
      <main className="contenido">
        <ListaEstudiantesTable />
      </main>
    </div>
  );
};

export default ListaEstudiantePage;