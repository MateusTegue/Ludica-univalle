import React, { useEffect, useState } from "react";
import { getEstudiantes } from "../../services/estudiante";
import { obtenerResultadosPorSemestre } from "../../services/resultadosConFiltros";
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
import "./ResultadosPorSemestre.css"; // Reutilizamos estilos existentes

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ResultadosPorSemestre = () => {
  const [semestres, setSemestres] = useState([]);
  const [semestreSeleccionado, setSemestreSeleccionado] = useState("");
  const [estudiantes, setEstudiantes] = useState([]);
  const [resultados, setResultados] = useState(null);

  useEffect(() => {
    async function cargarSemestres() {
      try {
        const response = await getEstudiantes();
        const estudiantes = response.data;

        const semestresUnicos = [
          ...new Set(estudiantes.map((e) => e.estudiante?.semestre || "Sin semestre"))
        ].sort((a, b) => a - b);

        setSemestres(semestresUnicos);

        const estudiantesData = response.data;
        setEstudiantes(estudiantesData);
      } catch (error) {
        console.error("Error al cargar semestres:", error);
      }
    }

    cargarSemestres();
  }, []);

  const manejarCambioSemestre = async (e) => {
    const nuevoSemestre = e.target.value;
    setSemestreSeleccionado(nuevoSemestre);

    if (nuevoSemestre) {
      try {
        const response = await obtenerResultadosPorSemestre(nuevoSemestre);
        setResultados(response.data);
      } catch (error) {
        console.error("Error al obtener estadísticas por semestre:", error);
        setResultados(null);
      }
    } else {
      setResultados(null);
    }
  };

  const contarEstudiantesPorSemestre = (semestre) => {
    return estudiantes.filter((e) => Number(e.estudiante?.semestre) === Number(semestre)).length;
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
            backgroundColor: "rgba(153, 102, 255, 0.6)",
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
        <h2>Filtrar Estadísticas por Semestre</h2>
        <select value={semestreSeleccionado} onChange={manejarCambioSemestre}>
          <option value="">Seleccione un semestre</option>
          {semestres.map((sem, index) => (
            <option key={index} value={sem}>
              {sem}
            </option>
          ))}
        </select>
      </div>

      {resultados && (
        <div className="filtro-edad-resultados">
          <h3>Estadísticas para semestre {semestreSeleccionado}</h3>
          <h4>Total de estudiantes: {contarEstudiantesPorSemestre(semestreSeleccionado)}</h4>
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

export default ResultadosPorSemestre;
