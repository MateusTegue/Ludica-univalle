// import { useState, useImperativeHandle, forwardRef } from "react";

// import { registrarEstudiante } from "../../services/estudiante.js";


// const FormularioRegistro = forwardRef((props, ref) => {
//   const [formData, setFormData] = useState({
//     estudiante: {
//       codigo: "",
//       nombre: "",
//       edad: "",
//       carrera: "",
//       semestre: "",
//       ciudad: "",
//     },
//     jugada: {
//       repeticiones: "",
//       tiempo: "",
//       lanzamientos: ""
//     },
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const [seccion, campo] = name.split(".");
//     setFormData((prev) => ({
//       ...prev,
//       [seccion]: {
//         ...prev[seccion],
//         [campo]: value,
//       },
//     }));
//   };

//   const handleSubmit = async (e) => {
//     if (e) e.preventDefault();
//     try {
//       const response = await registrarEstudiante(formData);
//       console.log(response.data);
//       alert("Estudiante registrado con éxito");
//     } catch (error) {
//       console.error("Error al registrar el estudiante:", error);
//       alert("Error al registrar el estudiante");
//     }
//   };

//   // Exponer función al componente padre
//   useImperativeHandle(ref, () => ({
//     registrar: handleSubmit
//   }));

//   return (
//     <form onSubmit={handleSubmit}>
//       <h2>Datos del Estudiante</h2>
//       <input name="estudiante.codigo" placeholder="Código" onChange={handleChange} />
//       <input name="estudiante.nombre" placeholder="Nombre" onChange={handleChange} />
//       <input name="estudiante.edad" type="number" placeholder="Edad" onChange={handleChange} />
//       <input name="estudiante.carrera" placeholder="Carrera" onChange={handleChange} />
//       <input name="estudiante.semestre" type="number" placeholder="Semestre" onChange={handleChange} />
//       <input name="estudiante.ciudad" placeholder="Ciudad" onChange={handleChange} />

//       <h2>Datos de la Jugada</h2>
//       <input name="jugada.repeticiones" type="number" placeholder="Repeticiones" onChange={handleChange} />
//       <input name="jugada.tiempo" type="number" placeholder="Tiempo" onChange={handleChange} />
//       <input name="jugada.lanzamientos" type="number" placeholder="Lanzamientos" onChange={handleChange} />


//     </form>
//   );
// });

// export default FormularioRegistro;


import { useState, useImperativeHandle, forwardRef } from "react";
import { registrarEstudiante } from "../../services/estudiante.js";
import "./FormularioRegistro.css"; // Importa los estilos

const FormularioRegistro = forwardRef((props, ref) => {
  // Estado inicial
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

  const [formData, setFormData] = useState(initialFormData);

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
      console.log(response.data);
      alert("Estudiante registrado con éxito");
      
      // Limpiar el formulario después de éxito
      setFormData(initialFormData);
      
    } catch (error) {
      console.error("Error al registrar el estudiante:", error);
      alert("Error al registrar el estudiante");
    }
  };

  // Exponer función al componente padre
  useImperativeHandle(ref, () => ({
    registrar: handleSubmit
  }));

  return (
    <form onSubmit={handleSubmit} className="form-registro">
      <h2>Datos del Estudiante</h2>
      <input name="estudiante.codigo" placeholder="Código" value={formData.estudiante.codigo}onChange={handleChange} />
      <input name="estudiante.nombre" placeholder="Nombre" value={formData.estudiante.nombre}onChange={handleChange} />
      <input name="estudiante.edad" type="number" placeholder="Edad" value={formData.estudiante.edad}onChange={handleChange} />
      <select name="estudiante.carrera" value={formData.estudiante.carrera} onChange={handleChange} className="input">
        <option value="">Seleccione una carrera</option>
        <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
        <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
        <option value="Administración de Empresas">Administración de Empresas</option>
        <option value="Contaduría Pública">Contaduría Pública</option>
        <option value="Psicología">Psicología</option>
        <option value="Derecho">Derecho</option>
      </select>
      <input name="estudiante.semestre" type="number" placeholder="Semestre" value={formData.estudiante.semestre}onChange={handleChange} />
      <select name="estudiante.ciudad" value={formData.estudiante.ciudad} onChange={handleChange} className="input">
        <option value="">Seleccione una ciudad</option>
        <option value="Bogotá">Bogotá</option>
        <option value="Medellín">Medellín</option>
        <option value="Cali">Cali</option>
        <option value="Barranquilla">Barranquilla</option>
        <option value="Cartagena">Cartagena</option>
        <option value="Bucaramanga">Bucaramanga</option>
        <option value="Pereira">Pereira</option>
        </select>
      <h2>Datos de la Jugada</h2>
      <input name="jugada.repeticiones" type="number" placeholder="Repeticiones" value={formData.jugada.repeticiones}onChange={handleChange} />
      <input name="jugada.tiempo" type="number" placeholder="Tiempo" value={formData.jugada.tiempo}onChange={handleChange} />
      <input name="jugada.lanzamientos" type="number" placeholder="Lanzamientos" value={formData.jugada.lanzamientos}onChange={handleChange} />
    </form>
  );
});

export default FormularioRegistro;
