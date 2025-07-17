import React, { useEffect, useState } from "react";
import { getEstudiantes } from "../../services/estudiante";
import { obtenerResultadosPorCarrera } from "../../services/resultadosConFiltros";
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
import "./resultadosPorCarrera.css"; // Reutilizando los mismos estilos

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const FiltroPorCarrera = () => {
  const [carreras, setCarreras] = useState([]);
  const [estudiantes, setEstudiantes] = useState([]);
  const [carreraSeleccionada, setCarreraSeleccionada] = useState("");
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    async function cargarCarreras() {
      try {
        const response = await getEstudiantes();
        const estudiantes = response.data;

        const estudiantesData = response.data;
        setEstudiantes(estudiantesData);

        const carrerasUnicas = [
          ...new Set(estudiantes.map((e) => e.estudiante?.carrera || "Sin carrera"))
        ].sort();

        setCarreras(carrerasUnicas);
      } catch (error) {
        console.error("Error al cargar carreras:", error);
      }
    }

    cargarCarreras();
  }, []);

  const manejarCambioCarrera = async (e) => {
    const nuevaCarrera = e.target.value;
    setCarreraSeleccionada(nuevaCarrera);

    if (nuevaCarrera) {
      try {
        const response = await obtenerResultadosPorCarrera(nuevaCarrera);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas por carrera:", error);
        setResultados(null);
      }
    } else {
      setResultados(null);
    }
  };

  const contarEstudiantesPorCarrera = (carrera) => {
  return estudiantes.filter((e) => (e.estudiante?.carrera || "Sin carrera") === carrera).length;
};


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
            backgroundColor: "rgba(75, 192, 192, 0.6)",
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
        <h2>Filtrar Estadísticas por Carrera</h2>
        <select value={carreraSeleccionada} onChange={manejarCambioCarrera}>
          <option value="">Seleccione una carrera</option>
          {carreras.map((carrera, index) => (
            <option key={index} value={carrera}>
              {carrera}
            </option>
          ))}
        </select>
      </div>

      {resultados && (
        <div className="filtro-edad-resultados">
          <h3>Estadísticas para carrera {carreraSeleccionada}</h3>
          <h4>Total de estudiantes: {contarEstudiantesPorCarrera(carreraSeleccionada)}</h4>
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

export default FiltroPorCarrera;
