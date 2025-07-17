import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const obtenerResultadosPorEdad = async (edad) => {
  return await axios.get(`${API_URL}/api/estadisticas/jugadas-filtradas`, {
    params: { edad }
  });
};


export const obtenerResultadosPorCarrera = async (carrera) => {
  return await axios.get(`${API_URL}/api/estadisticas/jugadas-filtradas`, {
    params: { carrera }
  });
};


export const obtenerResultadosPorCiudad = async (ciudad) => {
  return await axios.get(`${API_URL}/api/estadisticas/jugadas-filtradas`, {
    params: { ciudad }
  });
};


export const obtenerResultadosPorSemestre = async (semestre) => {
  return await axios.get(`${API_URL}/api/estadisticas/jugadas-filtradas`, {
    params: { semestre }
  });
};
