import { useEffect, useState } from "react";
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
import "./TotalEstudiantes.css";

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

export function TotalEstudiantes() {
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

    if (cargando) {
        return <div className="cargando">Cargando estudiantes...</div>;
    }

    if (error) {
        return <div className="error">{error}</div>;
    }

    // Preparar datos para los gráficos
    const nombres = estudiantes.map(e => e.estudiante?.nombre || 'Sin nombre');
    const repeticiones = estudiantes.map(e => e.jugada?.repeticiones || 0);
    const tiempos = estudiantes.map(e => e.jugada?.tiempo || 0);
    const lanzamientos = estudiantes.map(e => e.jugada?.lanzamientos || 0);
    
    // Datos por carrera
    const carreras = {};
    estudiantes.forEach(e => {
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
                    'rgba(255, 99, 132, 0.7)',
                    'rgba(54, 162, 235, 0.7)',
                    'rgba(255, 206, 86, 0.7)',
                    'rgba(75, 192, 192, 0.7)',
                    'rgba(153, 102, 255, 0.7)',
                ],
                borderWidth: 1
            }
        ]
    };

    return (
        <section className="dashboard2">
            <div className="dashboard-estudiantes">
                <h1 className="titulo-lista">Estadísticas de Estudiantes</h1>
                
                <div className="grid-graficos">
                    <div className="grafico-container">
                        <h2>Repeticiones y Lanzamientos</h2>
                        <Bar 
                            data={barData} 
                            options={{
                                responsive: true,
                                plugins: {
                                    legend: { position: 'top' },
                                    title: { display: true, text: 'Comparación por estudiante' }
                                }
                            }} 
                        />
                    </div>
                    
                    <div className="grafico-container">
                        <h2>Tiempos de Ejecución</h2>
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
                        <h2>Distribución por Carrera</h2>
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
