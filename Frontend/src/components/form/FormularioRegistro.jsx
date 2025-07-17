import { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { registrarEstudiante } from "../../services/estudiante.js";
import CarreraSelect from "../programasAcademicos/ProgramasAcademicos.jsx";
import CiudadesSelect from "../ciudades/ciudadesComponent.jsx";
import SemestreAcademico from "../semestreAcademico/SemestreAcademico.jsx";
import Cronometro from "../cronometro/cronometro.jsx";
import "./FormularioRegistro.css";

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
      toast.success("Estudiante registrado con éxito");
      setFormData(initialFormData);
      cronometroRef.current?.stop();
      cronometroRef.current?.reset();
    } catch (error) {
      console.error("Error al registrar el estudiante:", error);
      toast.error("Error al registrar el estudiante");    }
  };

  useImperativeHandle(ref, () => ({
    registrar: handleSubmit
  }));

  return (
    <form onSubmit={handleSubmit} className="form-registro">
      <h2>Datos del Estudiante</h2>
      <input name="estudiante.codigo" type="number" placeholder="Código 2644679"  value={formData.estudiante.codigo} onChange={(e) => {
        const value = e.target.value;
        if (value.length <= 7) {
          handleChange(e);
        }
      }}/>
      <input name="estudiante.nombre" placeholder="Nombre" value={formData.estudiante.nombre} onChange={handleChange} />
      <input name="estudiante.edad" type="number" placeholder="Edad" value={formData.estudiante.edad} onChange={handleChange} />
      <CiudadesSelect name="estudiante.ciudad" value={formData.estudiante.ciudad} onChange={handleChange} />
      <CarreraSelect name="estudiante.carrera" value={formData.estudiante.carrera} onChange={handleChange} />
      <SemestreAcademico name="estudiante.semestre" value={formData.estudiante.semestre} onChange={handleChange} />
      <h2>Datos de la Jugada</h2>
      <Cronometro ref={cronometroRef} onTiempoChange={handleTiempoChange} />
      <input type="hidden" name="jugada.tiempo" value={formData.jugada.tiempo}/>
      <input name="jugada.repeticiones" type="number" placeholder="Repeticiones" value={formData.jugada.repeticiones}onChange={handleChange} />
      <input name="jugada.lanzamientos" type="number" placeholder="Lanzamientos" value={formData.jugada.lanzamientos}onChange={handleChange} />
      <button type="submit">Registrar</button>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
});

export default FormularioRegistro;
