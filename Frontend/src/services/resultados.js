import axios from "axios";

// url en la cual se esta ejecutando el backend localmente 
const API_URL = import.meta.env.VITE_API_URL;


// obtener todos los resultados generales del juego 
export const getResultados = async () => {
    return await axios.get(`${API_URL}/api/estadisticas/jugadas/`);
}
 