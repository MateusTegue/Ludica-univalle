import React from 'react';
import './MenuOpciones.css'; // Importa los estilos

const MenuOpciones = ({ onRegistrar }) => {
    return (
        <aside className="menu-opciones">
            <h2>Opciones</h2>
            <div>
                
                <button onClick={onRegistrar}>Mostrar Datos</button>
                <button onClick={onRegistrar}>Mostrar Datos</button>
                <button onClick={onRegistrar}>Mostrar Datos</button>
                <button onClick={onRegistrar}>Registrar</button>

            </div>
        </aside>
    );
};

export default MenuOpciones;