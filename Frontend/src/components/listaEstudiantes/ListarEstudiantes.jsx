
import { useEffect, useState, useMemo } from "react";
import { getEstudiantes } from "../../services/estudiante";
import { 
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar, Line, Pie } from 'react-chartjs-2';
import "./ListarEstudiantes.css";

// Registrar componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export function ListarEstudiantes() {
    const [estudiantes, setEstudiantes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarEstudiantes() {
            try {
                const res = await getEstudiantes();
                setEstudiantes(res.data);
            } catch (err) {
                setError("Error al cargar los estudiantes");
                console.error(err);
            } finally {
                setCargando(false);
            }
        }
        cargarEstudiantes();
    }, []);

    // Obtener los 5 mejores estudiantes combinando las tres métricas
    const top5Estudiantes = useMemo(() => {
        if (!estudiantes.length) return [];
        
        // Ordenar por la suma de las tres métricas (todas donde menor es mejor)
        return [...estudiantes]
            .filter(e => e.jugada?.tiempo != null && e.jugada?.repeticiones != null && e.jugada?.lanzamientos != null)
            .sort((a, b) => {
                const scoreA = a.jugada.tiempo + a.jugada.repeticiones + a.jugada.lanzamientos;
                const scoreB = b.jugada.tiempo + b.jugada.repeticiones + b.jugada.lanzamientos;
                return scoreA - scoreB;
            })
            .slice(0, 5);
    }, [estudiantes]);

    if (cargando) {
        return <div className="cargando">Cargando estudiantes...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Preparar datos para los gráficos usando solo los 5 mejores
    const nombres = top5Estudiantes.map(e => e.estudiante?.nombre || 'Sin nombre');
    const repeticiones = top5Estudiantes.map(e => e.jugada?.repeticiones || 0);
    const tiempos = top5Estudiantes.map(e => e.jugada?.tiempo || 0);
    const lanzamientos = top5Estudiantes.map(e => e.jugada?.lanzamientos || 0);
    
    // Datos por carrera (solo de los 5 mejores)
    const carreras = {};
    top5Estudiantes.forEach(e => {
        const carrera = e.estudiante?.carrera || 'Sin especificar';
        carreras[carrera] = (carreras[carrera] || 0) + 1;
    });

    // Configuración de gráficos
    const barData = {
        labels: nombres,
        datasets: [
            {
                label: 'Repeticiones',
                data: repeticiones,
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            },
            {
                label: 'Lanzamientos',
                data: lanzamientos,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }
        ]
    };

    const lineData = {
        labels: nombres,
        datasets: [
            {
                label: 'Tiempo (segundos)',
                data: tiempos,
                fill: false,
                backgroundColor: 'rgba(75, 192, 192, 0.5)',
                borderColor: 'rgba(75, 192, 192, 1)',
                tension: 0.1
            }
        ]
    };

    const pieData = {
        labels: Object.keys(carreras),
        datasets: [
            {
                data: Object.values(carreras),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.7)',   // rojo rosado
                    'rgba(54, 162, 235, 0.7)',   // azul
                    'rgba(255, 206, 86, 0.7)',   // amarillo
                    'rgba(75, 192, 192, 0.7)',   // turquesa
                    'rgba(153, 102, 255, 0.7)',  // morado
                    'rgba(255, 159, 64, 0.7)',   // naranja
                    'rgba(199, 199, 199, 0.7)',  // gris claro
                    'rgba(83, 102, 255, 0.7)',   // azul intenso
                    'rgba(255, 99, 71, 0.7)',    // tomate
                    'rgba(60, 179, 113, 0.7)',   // verde medio
                    'rgba(238, 130, 238, 0.7)',  // violeta
                    'rgba(100, 149, 237, 0.7)',  // azul acero
                    'rgba(255, 105, 180, 0.7)',  // rosa intenso
                    'rgba(46, 139, 87, 0.7)',    // verde bosque
                    'rgba(160, 82, 45, 0.7)',    // marrón
                    'rgba(70, 130, 180, 0.7)',    // azul grisáceo

                    'rgba(210, 105, 30, 0.7)',   // chocolate
                    'rgba(0, 191, 255, 0.7)',    // azul cielo profundo
                    'rgba(127, 255, 212, 0.7)',  // aguamarina
                    'rgba(255, 20, 147, 0.7)',   // rosa profundo
                    'rgba(144, 238, 144, 0.7)',  // verde claro
                    'rgba(255, 215, 0, 0.7)',    // dorado
                    'rgba(0, 206, 209, 0.7)',    // turquesa oscuro
                    'rgba(123, 104, 238, 0.7)',  // azul medio pizarra
                    'rgba(255, 182, 193, 0.7)',  // rosa claro
                    'rgba(189, 183, 107, 0.7)',  // caqui oscuro
                    'rgba(72, 209, 204, 0.7)',   // turquesa medio
                    'rgba(176, 224, 230, 0.7)',  // azul pálido
                    'rgba(95, 158, 160, 0.7)',   // azul cadete
                    'rgba(205, 92, 92, 0.7)',    // rojo indio
                    'rgba(233, 150, 122, 0.7)'   // salmón oscuro
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <section className="dashboard">
        <div className="dashboard-estudiantes">
            <h3 className="titulo-lista">Top 5 Mejores Estudiantes</h3>
            
            <div className="grid-graficos">
                <div className="grafico-container">
                    <h3>Repeticiones y Lanzamientos</h3>
                    <Bar 
                        data={barData} 
                        options={{
                            responsive: true,
                            plugins: {
                                legend: { position: 'top' }
                            },
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }} 
                    />
                </div>
                
                <div className="grafico-container">
                    <h3>Tiempos de Ejecución</h3>
                    <Line 
                        data={lineData} 
                        options={{
                            responsive: true,
                            scales: {
                                y: { beginAtZero: true }
                            }
                        }} 
                    />
                </div>
                
                <div className="grafico-container">
                    <h3>Distribución por Carrera</h3>
                    <Pie 
                        data={pieData} 
                        options={{ 
                            responsive: true,
                            plugins: {
                                legend: { position: 'right' }
                            }
                        }} 
                    />
                </div>
            </div>
        </div>
        </section>
    );
}