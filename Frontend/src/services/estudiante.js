import axios from 'axios';

// url la cual es donde se esta ejecutando el backend locamente 
const API_URL = import.meta.env.VITE_API_URL;

// registrar un estudiante
export const registrarEstudiante = async (data) => {
    return await axios.post(`${API_URL}/api/registro-completo/`, data);
};


// obtener todos los estudiantes
export const getEstudiantes = async () => {
    return await axios.get(`${API_URL}/api/registro-completo/`);
};

// obtener un estudiante por id
export const getEstudiante = async (id) => {
    return await axios.get(`${API_URL}/api/registro-completo/${id}/`);
};

//