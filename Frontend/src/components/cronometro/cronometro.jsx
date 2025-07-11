import { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import './Cronometro.css';

const Cronometro = forwardRef(({ onTiempoChange }, ref) => {
    const [tiempo, setTiempo] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const intervalRef = useRef(null);
    const handleStart = () => {
        if (!isRunning) {
            setIsRunning(true);
            intervalRef.current = setInterval(() => {
                setTiempo(prev => prev + 1);
            }, 1000);
        }
    };

    const handleReset = () => {
        clearInterval(intervalRef.current);
        setTiempo(0);
        setIsRunning(false);
    };

    const handleStop = () => {
        clearInterval(intervalRef.current);
        setIsRunning(false);
    };

    useImperativeHandle(ref, () => ({
        stop: handleStop,
        reset: handleReset
    }));

    useEffect(() => {
        return () => clearInterval(intervalRef.current);
    }, []);

    const formatTiempo = (segundos) => {
        const mins = Math.floor(segundos / 60);
        const secs = segundos % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    useEffect(() => {
        if (onTiempoChange) {
            onTiempoChange(tiempo); 
        }
    }, [tiempo]);

    return (
        <div className="container">
            <div className="time"><p>{formatTiempo(tiempo)}</p></div>
            <a className='btn' onClick={handleStop} disabled={!isRunning}>Pausar</a>
            <a onClick={handleReset} disabled={!isRunning}>Reiniciar</a>
            <a className="button" onClick={handleStart} disabled={isRunning}>
                {isRunning ? 'En marcha...' : 'Iniciar'}
            </a>
        </div>
    );
});

export default Cronometro;

