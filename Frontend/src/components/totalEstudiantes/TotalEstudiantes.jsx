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
        <section className="dashboard2">
            <div className="dashboard-estudiantes">
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
                         {/* <Pie 
                            data={pieData} 
                            options={{ 
                                responsive: true,
                                plugins: {
                                legend: { position: 'right' },
                                datalabels: {
                                    color: '#000',
                                    formatter: (value, context) => {
                                    const total = context.chart._metasets[0].total;
                                    const percentage = ((value / total) * 100).toFixed(1);
                                    return `${percentage}%`;
                                    },
                                    font: {
                                    weight: 'bold',
                                    size: 14
                                    }
                                }
                                }
                            }}
                            plugins={[ChartDataLabels]}
                            /> */}
                    </div>
                </div>
            </div>
        </section>
    );
}
