import React, { useEffect, useState } from "react";
import { getEstudiantes } from "../../services/estudiante";
import { obtenerResultadosPorEdad } from "../../services/resultadosConFiltros";
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
import "./FiltroPorEdadComponent.css";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FiltroPorEdad = () => {
  const [edades, setEdades] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [edadSeleccionada, setEdadSeleccionada] = useState("");
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    async function cargarEdades() {
      try {
        const response = await getEstudiantes();
        const estudiantes = response.data;
        const edadesUnicas = [...new Set(estudiantes.map((e) => e.estudiante.edad))].sort((a, b) => a - b);
        setEdades(edadesUnicas);

        const estudiantesData = response.data;
        setEstudiantes(estudiantesData);
      } catch (error) {
        console.error("Error al cargar edades:", error);
      }
    }

    cargarEdades();
  }, []);

  const manejarCambioEdad = async (e) => {
    const nuevaEdad = e.target.value;
    setEdadSeleccionada(nuevaEdad);

    if (nuevaEdad) {
      try {
        const response = await obtenerResultadosPorEdad(nuevaEdad);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas por edad:", error);
        setResultados(null);
      }
    } else {
      setResultados(null);
    }
  };

  const contarEstudiantesPorEdad = (edad) => {
    return estudiantes.filter((e) => Number(e.estudiante?.edad) === Number(edad)).length;
  };
 
  const generarDatosMetrica = (titulo, metrica) => {
    const datos = resultados[metrica] || {};

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
            backgroundColor: "rgba(54, 162, 235, 0.6)",
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
        <h2>Filtrar Estadísticas por Edad</h2>
        <select value={edadSeleccionada} onChange={manejarCambioEdad}>
          <option value="">Seleccione una edad</option>
          {edades.map((edad) => (
            <option key={edad} value={edad}>
              {edad} años
            </option>
          ))}
        </select>
      </div>

      {resultados && (
        <div className="filtro-edad-resultados">
          <h3>Estadísticas para edad {edadSeleccionada}</h3>
            <h4>Total de estudiantes: {contarEstudiantesPorEdad(edadSeleccionada)}</h4>
            <div className="grafico-container">
                <div className="chart-box">
                  <Bar {...generarDatosMetrica("Repeticiones", "repeticiones")} />
                </div>
                <div className="chart-box">
                  <Bar {...generarDatosMetrica("Tiempo", "tiempo")} />
                </div>
                <div className="chart-box">
                  <Bar {...generarDatosMetrica("Lanzamientos", "lanzamientos")} />
                </div>
              </div>
        </div>
      )}
    </div>
  );
};

export default FiltroPorEdad;



