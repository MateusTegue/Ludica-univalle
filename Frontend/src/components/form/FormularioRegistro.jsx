import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { registrarEstudiante } from "../../services/estudiante.js";
import CarreraSelect from "../programasAcademicos/ProgramasAcademicos.jsx";
import CiudadesSelect from "../ciudades/ciudadesComponent.jsx";
import Cronometro from "../cronometro/cronometro.jsx";
import "./FormularioRegistro.css"; // Importa los estilos

const FormularioRegistro = forwardRef((props, ref) => {
  const initialFormData = {
    estudiante: {
      codigo: "",
      nombre: "",
      edad: "",
      carrera: "",
      semestre: "",
      ciudad: "",
    },
    jugada: {
      repeticiones: "",
      tiempo: "",
      lanzamientos: ""
    },
  };
  
  const cronometroRef = useRef();
  const [formData, setFormData] = useState(initialFormData);
  const handleTiempoChange = (nuevoTiempo) => {
    setFormData((prev) => ({
      ...prev,
      jugada: {
        ...prev.jugada,
        tiempo: nuevoTiempo,
      },
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [seccion, campo] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [seccion]: {
        ...prev[seccion],
        [campo]: value,
      },
    }));
  };

  const handleSubmit = async (e) => {
    if (e) e.preventDefault();
    try {
      const response = await registrarEstudiante(formData);
      alert("Estudiante registrado con éxito");
      setFormData(initialFormData);
      cronometroRef.current?.stop();
      cronometroRef.current?.reset();
    } catch (error) {
      console.error("Error al registrar el estudiante:", error);
      alert("Error al registrar el estudiante");
    }
  };

  useImperativeHandle(ref, () => ({
    registrar: handleSubmit
  }));

  return (
    <form onSubmit={handleSubmit} className="form-registro">
      <h2>Datos del Estudiante</h2>
      <input name="estudiante.codigo" placeholder="Código" value={formData.estudiante.codigo}onChange={handleChange} />
      <input name="estudiante.nombre" placeholder="Nombre" value={formData.estudiante.nombre} onChange={handleChange} />
      <input name="estudiante.edad" type="number" placeholder="Edad" value={formData.estudiante.edad} onChange={handleChange} />
      <CarreraSelect name="estudiante.carrera" value={formData.estudiante.carrera} onChange={handleChange} />
      <input name="estudiante.semestre" type="number" placeholder="Semestre" value={formData.estudiante.semestre}onChange={handleChange} />
      <CiudadesSelect name="estudiante.ciudad" value={formData.estudiante.ciudad} onChange={handleChange} />
      <h2>Datos de la Jugada</h2>
      <Cronometro ref={cronometroRef} onTiempoChange={handleTiempoChange} />
      <input type="hidden" name="jugada.tiempo" value={formData.jugada.tiempo}/>
      <input name="jugada.repeticiones" type="number" placeholder="Repeticiones" value={formData.jugada.repeticiones}onChange={handleChange} />
      <input name="jugada.lanzamientos" type="number" placeholder="Lanzamientos" value={formData.jugada.lanzamientos}onChange={handleChange} />
    </form>
  );
});

export default FormularioRegistro;
