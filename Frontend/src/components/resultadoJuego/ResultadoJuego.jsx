
import { useEffect, useState } from "react";
import { getResultados } from "../../services/resultados";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './ResultadoJuego.css';

// registramos los componenetes necesarios para realozar la graficas 
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export function EstadisticasJugadas() {
    // Estado para almacenar las estadísticas
    const formatNumber = (num) => {
        if (typeof num === 'number') return num.toFixed(2);
        if (Array.isArray(num)) return num.map(n => n.toFixed(2)).join(', ');
        return 'N/A';
    };
    
    const [estadisticas, setEstadisticas] = useState(null);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function cargarEstadisticas() {
            try {
                const res = await getResultados();
                setEstadisticas(res.data);
            } catch (err) {
                setError("Error al cargar las estadísticas");
                console.error(err);
            } finally {
                setCargando(false);
            }
        }
        cargarEstadisticas();
    }, []);

    if (cargando) return <div className="cargando">Cargando estadísticas...</div>;
    if (error) return <div className="error">{error}</div>;
    if (!estadisticas) return <div className="error">No hay datos disponibles</div>;

    // Configuración común para gráficos
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
        legend: { position: 'top' },
        },
        scales: { y: { beginAtZero: true } }
    };

    const createChartData = (metric, title) => {
        const moda = estadisticas[metric].moda;
        const incluirModa = Array.isArray(moda) && moda.length === 1;
    
        const labels = ['Media', 'Mediana'];
        const data = [
            estadisticas[metric].media,
            estadisticas[metric].mediana
        ];
        const backgroundColor = [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 99, 132, 0.7)'
        ];
    
        if (incluirModa) {
            labels.push('Moda');
            data.push(moda[0]);
            backgroundColor.push('rgba(75, 192, 192, 0.7)');
        }
        return { labels, datasets: [{ label: title, data, backgroundColor}]};
    };
    return (
        <div className="estadisticas-container">
            <h4 className="titulo-principal">Estadísticas de Jugadas</h4>
            <div className="grid-tres-columnas">
                <div className="grafico-card">
                    <h5 className="titulo-grafico">Repeticiones - Tendencia Central</h5>
                    <div className="grafico-wrapper">
                        <Bar
                            data={createChartData('repeticiones', 'Repeticiones')}
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: { display: false }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="grafico-card">
                    <h5 className="titulo-grafico">Tiempo - Tendencia Central</h5>
                    <div className="grafico-wrapper">
                        <Bar
                            data={createChartData('tiempo', 'Tiempo')}
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: { display: false }
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="grafico-card">
                    <h5 className="titulo-grafico">Lanzamientos - Tendencia Central</h5>
                    <div className="grafico-wrapper">
                        <Bar
                            data={createChartData('lanzamientos', 'Lanzamientos')}
                            options={{
                                ...commonOptions,
                                plugins: {
                                    ...commonOptions.plugins,
                                    title: { display: false }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>

            {/* Resumen estadistico de los resultados  */}
            <div className="resumen-estadistico">
                <h5 className="titulo-resumen">Resumen Estadístico</h5>
                <div className="metricas-grid">
                    {['repeticiones', 'tiempo', 'lanzamientos'].map((metric) => (
                        <div key={`resumen-${metric}`} className="metrica-card">
                            <h3 className="titulo-card">{metric.charAt(0).toUpperCase() + metric.slice(1)}</h3>
                            <p><strong>Media:</strong> {formatNumber(estadisticas[metric]?.media)}</p>
                            <p><strong>Mediana:</strong> {formatNumber(estadisticas[metric]?.mediana)}</p>
                            <p><strong>Moda:</strong> {formatNumber(estadisticas[metric]?.moda)}</p>
                            <p><strong>Desviación:</strong> {formatNumber(estadisticas[metric]?.desviacion)}</p>
                            <p><strong>Varianza:</strong> {formatNumber(estadisticas[metric]?.varianza)}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}