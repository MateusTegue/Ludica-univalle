import { Link } from 'react-router-dom';
import logo from "../../assets/Logo.png"
import './Navegacion.css'; // Importa los estilos


export function Navegacion() {
    return (
        <header className="navegacion-header ">
         <h2 className='Logo'>Ludica Univalle</h2>
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
            <Link to="/participantes" className='navegacion-link'>
                Participantes
            </Link>
        </nav>
    </header>
    );
}

export default Navegacion;





