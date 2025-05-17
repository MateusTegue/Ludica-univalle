import { Link } from 'react-router-dom';
import './Navegacion.css'; // Importa los estilos

export function Navegacion() {
    return (
        <header className="navegacion-header ">
         <h2>VisualizaData</h2>
        <nav className="navegacion-nav">
            <Link to="/home" className="navegacion-link">
                Home
            </Link>
            <Link to="/estudiantes" className="navegacion-link">
                Estudiantes
            </Link>
            <Link to="/resultado" className="navegacion-link">
                Resultados
            </Link>
        </nav>
    </header>
    );
}

export default Navegacion;





