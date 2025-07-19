import React, { useEffect, useState } from "react";
import { getEstudiantes } from "../../services/estudiante";
import { obtenerResultadosPorCiudad } from "../../services/resultadosConFiltros";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Bar } from "react-chartjs-2";
import "./ResultadosPorCiudad.css"; // reutilizamos mismos estilos

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultadosPorCiudad = () => {
  const [ciudades, setCiudades] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [ciudadSeleccionada, setCiudadSeleccionada] = useState("");
  const [resultados, setResultados] = useState(null);


  useEffect(() => {
    async function cargarCiudades() {
      try {
        const response = await getEstudiantes();
        const estudiantes = response.data;
        
        const estudiantesData = response.data;
        setEstudiantes(estudiantesData);

        const ciudadesUnicas = [
          ...new Set(estudiantes.map((e) => e.estudiante?.ciudad || "Sin ciudad"))
        ].sort();

        setCiudades(ciudadesUnicas);
      } catch (error) {
        console.error("Error al cargar ciudades:", error);
      }
    }

    cargarCiudades();
  }, []);

  const manejarCambioCiudad = async (e) => {
    const nuevaCiudad = e.target.value;
    setCiudadSeleccionada(nuevaCiudad);

    if (nuevaCiudad) {
      try {
        const response = await obtenerResultadosPorCiudad(nuevaCiudad);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas por ciudad:", error);
        setResultados(null);
      }
    } else {
      setResultados(null);
    }
  };

  const contarEstudiantesPorCiudad = (ciudad) => {
  return estudiantes.filter((e) => (e.estudiante?.ciudad || "Sin ciudad") === ciudad).length;
};

  const datosRepeticiones = resultados?.repeticiones || {};
  const datosTiempo = resultados?.tiempo || {};
  const datosLanzamientos = resultados?.lanzamientos || {};

  const generarDatosMetrica = (titulo, metrica) => {
    const datos = resultados?.[metrica] || {};

    return {
      data: {
        labels: ["Media", "Mediana", "Moda", "Desviación", "Varianza"],
        datasets: [
          {
            label: titulo,
            data: [
              datos.media || 0,
              datos.mediana || 0,
              Array.isArray(datos.moda) ? datos.moda[0] : datos.moda ?? 0,
              datos.desviacion || 0,
              datos.varianza || 0,
            ],
            backgroundColor: "rgba(255, 159, 64, 0.6)",
          },
        ],
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: `Estadísticas de ${titulo}` },
        },
        scales: {
          y: { beginAtZero: true },
        },
      },
    };
  };

  return (
    <div className="filtro-edad-container">
      <div className="filtro-edad-select">
        <h2>Filtrar Estadísticas por Ciudad</h2>
        <select value={ciudadSeleccionada} onChange={manejarCambioCiudad}>
          <option value="">Seleccione una ciudad</option>
          {ciudades.map((ciudad, index) => (
            <option key={index} value={ciudad}>
              {ciudad}
            </option>
          ))}
        </select>
      </div>

      {resultados && (
        <div className="filtro-edad-resultados">
          <h3>Estadísticas para ciudad {ciudadSeleccionada}</h3>
          <h4>Total de estudiantes: {contarEstudiantesPorCiudad(ciudadSeleccionada)}</h4>
          <div className="grafico-container">
            <div className="chart-box">
              <Bar {...generarDatosMetrica("Repeticiones", "repeticiones")} />
              <div className="metricas-detalle">
                <p>Media: {datosRepeticiones.media ?? "N/A"}</p>
                <p>Mediana: {datosRepeticiones.mediana ?? "N/A"}</p>
                <p>Moda: {Array.isArray(datosRepeticiones.moda) ? datosRepeticiones.moda.join(", ") : datosRepeticiones.moda ?? "N/A"}</p>
                <p>Desviación: {datosRepeticiones.desviacion ?? "N/A"}</p>
                <p>Varianza: {datosRepeticiones.varianza ?? "N/A"}</p>
              </div>
            </div>
            <div className="chart-box">
              <Bar {...generarDatosMetrica("Tiempo", "tiempo")} />
              <div className="metricas-detalle">
                <p>Media: {datosTiempo.media ? (datosTiempo.media / 60).toFixed(2) + " min" : "N/A"}</p>
                <p>Mediana: {datosTiempo.mediana ? (datosTiempo.mediana / 60).toFixed(2) + " min" : "N/A"}</p>
                <p>Moda: {
                  Array.isArray(datosTiempo.moda)
                    ? datosTiempo.moda.map((m) => (m / 60).toFixed(2)).join(", ") + " min"
                    : datosTiempo.moda
                      ? (datosTiempo.moda / 60).toFixed(2) + " min"
                       : "N/A"
                }</p>
                <p>Desviación: {datosTiempo.desviacion ? (datosTiempo.desviacion / 60).toFixed(2) + " min" : "N/A"}</p>
                <p>Varianza: {datosTiempo.varianza ? (datosTiempo.varianza / 60).toFixed(2) + " min²" : "N/A"}</p>
              </div>
             </div>
            <div className="chart-box">
              <Bar {...generarDatosMetrica("Lanzamientos", "lanzamientos")} />
              <div className="metricas-detalle">
                <p>Media: {datosLanzamientos.media ?? ""}</p>
                <p>Mediana: {datosLanzamientos.mediana ?? "N/A"}</p>
                <p>Moda: {Array.isArray(datosLanzamientos.moda) ? datosLanzamientos.moda.join(", ") : datosLanzamientos.moda ?? "N/A"}</p>
                <p>Desviación: {datosLanzamientos.desviacion ?? "N/A"}</p>
                <p>Varianza: {datosLanzamientos.varianza ?? "N/A"}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResultadosPorCiudad;
