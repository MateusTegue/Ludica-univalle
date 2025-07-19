// import { useEffect, useState } from "react";
// import { getEstudiantes } from "../../services/estudiante";
// import  imagenPDF  from "../../assets/Logo.png"
// import jsPDF from "jspdf";
// import "jspdf-autotable";
// import "./ListaEstudiantesTable.css";

// const ListaEstudiantesTable = () => {
//   const [estudiantes, setEstudiantes] = useState([]);
//   const [cargando, setCargando] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     async function cargarEstudiantes() {
//       try {
//         const res = await getEstudiantes();
//         setEstudiantes(res.data);
//       } catch (err) {
//         setError("Error al cargar los estudiantes");
//         console.error(err);
//       } finally {
//         setCargando(false);
//       }
//     }

//     cargarEstudiantes();
//     const intervalo = setInterval(cargarEstudiantes, 5000);
//     return () => clearInterval(intervalo);
//   }, []);


//   const cargarImagenComoBase64 = (url) => {
//     return new Promise((resolve, reject) => {
//       const img = new Image();
//         img.crossOrigin = "Anonymous";
//         img.src = url;
//         img.onload = () => {
//           const canvas = document.createElement("canvas");
//           canvas.width = img.width;
//           canvas.height = img.height;
//           const ctx = canvas.getContext("2d");
//           ctx.drawImage(img, 0, 0);
//           const dataUrl = canvas.toDataURL("image/png");
//           resolve(dataUrl);
//         };
//         img.onerror = (e) => reject(e);
//       });
//     };

//   const generarPDF = async () => {
//   const doc = new jsPDF();

//   // Insertar logo
//   try {
//     const logoBase64 = await cargarImagenComoBase64(imagenPDF);
//     doc.addImage(logoBase64, "PNG", 15, 10, 25, 35); 
//   } catch (err) {
//     console.error("Error cargando imagen", err);
//   }
  
//   doc.setFontSize(12);
//   doc.text("Ludica", 97, 15);
//   doc.text("Probabilidad y Estadisticas", 79, 25);
//   doc.text("En el siguiente documento se evidencia la lista de participantes", 47, 35);

//   doc.setFontSize(12);
//   doc.text("Lista de Estudiantes", 85, 55); 

//   // Datos de estudiantes
//   const data = estudiantes.map((registro) => [
//     registro.estudiante.codigo,
//     registro.estudiante.nombre,
//     registro.estudiante.edad,
//     registro.estudiante.carrera,
//     registro.estudiante.ciudad,
//     registro.jugada?.repeticiones ?? "N/A",
//     registro.jugada?.lanzamientos ?? "N/A",
//     registro.jugada?.tiempo
//   ? `${Math.floor(registro.jugada.tiempo / 60)}:${String(registro.jugada.tiempo % 60).padStart(2, "0")} min`
//   : "N/A"

//   ]);

//   // Tabla
//   doc.autoTable({
//     startY: 60, 
//     head: [[
//       "Código", "Nombre", "Edad", "Carrera", "Ciudad",
//       "Repeticiones", "Lanzamientos", "Tiempo"
//     ]],
//     body: data,
//   });

//   doc.save("estudiantes.pdf");
// };


//   if (cargando) return <p>Cargando estudiantes...</p>;
//   if (error) return <p>{error}</p>;

//   return (
//     <div className="lista-estudiantes">
//       <h3>Lista de estudiantes</h3>
//       <button onClick={generarPDF} className="btn-pdf">Descargar PDF</button>
//       {estudiantes.length === 0 ? (
//         <h3 className="not-estudent">No hay estudiantes registrados.</h3>
//       ) : (
//         <table border="1" cellPadding="10">
//           <thead>
//             <tr>
//               <th>Código</th>
//               <th>Nombre</th>
//               <th>Edad</th>
//               <th>Carrera</th>
//               <th>Ciudad</th>
//               <th>Repeticiones</th>
//               <th>Lanzamientos</th>
//               <th>Tiempo</th>
//             </tr>
//           </thead>
//           <tbody>
//             {estudiantes.map((registro, index) => (
//               <tr key={index}>
//                 <td>{registro.estudiante.codigo}</td>
//                 <td>{registro.estudiante.nombre}</td>
//                 <td>{registro.estudiante.edad}</td>
//                 <td>{registro.estudiante.carrera}</td>
//                 <td>{registro.estudiante.ciudad}</td>
//                 <td>{registro.jugada?.repeticiones ?? "N/A"}</td>
//                 <td>{registro.jugada?.lanzamientos ?? "N/A"}</td>
//                 <td>{registro.jugada?.tiempo ? `${Math.floor(registro.jugada.tiempo / 60)}:${String(registro.jugada.tiempo % 60).padStart(2, "0")} min` : "N/A"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default ListaEstudiantesTable;



import { useEffect, useState } from "react";
import { getEstudiantes } from "../../services/estudiante";
import  imagenPDF  from "../../assets/Logo.png"
import jsPDF from "jspdf";
import "jspdf-autotable";
import "./ListaEstudiantesTable.css";

const ListaEstudiantesTable = () => {
  const [paginaActual, setPaginaActual] = useState(1);
  const estudiantesPorPagina = 10; 
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
    const intervalo = setInterval(cargarEstudiantes, 5000);
    return () => clearInterval(intervalo);
  }, []);


  const indexUltimoEstudiante = paginaActual * estudiantesPorPagina;
  const indexPrimerEstudiante = indexUltimoEstudiante - estudiantesPorPagina;
  const estudiantesPaginados = estudiantes.slice(indexPrimerEstudiante, indexUltimoEstudiante);

  const totalPaginas = Math.ceil(estudiantes.length / estudiantesPorPagina);

  const siguientePagina = () => {
    if (paginaActual < totalPaginas) setPaginaActual(paginaActual + 1);
  };

  const paginaAnterior = () => {
    if (paginaActual > 1) setPaginaActual(paginaActual - 1);
  };



  const cargarImagenComoBase64 = (url) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          resolve(dataUrl);
        };
        img.onerror = (e) => reject(e);
      });
    };

  const generarPDF = async () => {
  const doc = new jsPDF();

  // Insertar logo
  try {
    const logoBase64 = await cargarImagenComoBase64(imagenPDF);
    doc.addImage(logoBase64, "PNG", 15, 10, 25, 35); 
  } catch (err) {
    console.error("Error cargando imagen", err);
  }
  
  doc.setFontSize(12);
  doc.text("Ludica", 97, 15);
  doc.text("Probabilidad y Estadisticas", 79, 25);
  doc.text("En el siguiente documento se evidencia la lista de participantes", 47, 35);

  doc.setFontSize(12);
  doc.text("Lista de Estudiantes", 85, 55); 

  // Datos de estudiantes
  const data = estudiantes.map((registro) => [
    registro.estudiante.codigo,
    registro.estudiante.nombre,
    registro.estudiante.edad,
    registro.estudiante.carrera,
    registro.estudiante.ciudad,
    registro.jugada?.repeticiones ?? "N/A",
    registro.jugada?.lanzamientos ?? "N/A",
    registro.jugada?.tiempo
  ? `${Math.floor(registro.jugada.tiempo / 60)}:${String(registro.jugada.tiempo % 60).padStart(2, "0")} min`
  : "N/A"

  ]);

  // Tabla
  doc.autoTable({
    startY: 60, 
    head: [[
      "Código", "Nombre", "Edad", "Carrera", "Ciudad",
      "Repeticiones", "Lanzamientos", "Tiempo"
    ]],
    body: data,
  });

  doc.save("Participantes.pdf");
};


  if (cargando) return <p>Cargando estudiantes...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="lista-estudiantes">
      <h3>Lista de estudiantes</h3>
      {estudiantes.length === 0 ? (
        <h3 className="not-estudent">No hay estudiantes registrados.</h3>
      ) : (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Código</th>
              <th>Nombre</th>
              <th>Edad</th>
              <th>Carrera</th>
              <th>Ciudad</th>
              <th>Repeticiones</th>
              <th>Lanzamientos</th>
              <th>Tiempo</th>
            </tr>
          </thead>
          <tbody>
            {estudiantesPaginados.map((registro, index) => (
              <tr key={index}>
                <td>{registro.estudiante.codigo}</td>
                <td>{registro.estudiante.nombre}</td>
                <td>{registro.estudiante.edad}</td>
                <td>{registro.estudiante.carrera}</td>
                <td>{registro.estudiante.ciudad}</td>
                <td>{registro.jugada?.repeticiones ?? "N/A"}</td>
                <td>{registro.jugada?.lanzamientos ?? "N/A"}</td>
                <td>
                  {registro.jugada?.tiempo
                    ? `${Math.floor(registro.jugada.tiempo / 60)}:${String(registro.jugada.tiempo % 60).padStart(2, "0")} min`
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="paginacion">
        <button onClick={paginaAnterior} disabled={paginaActual === 1}>
          <p>Anterior</p>
        </button>
        <span>
          Página {paginaActual} de {totalPaginas}
        </span>
        <button onClick={siguientePagina} disabled={paginaActual === totalPaginas}>
          <p>Siguiente</p>
        </button>
        <button onClick={generarPDF} className="btn-pdf">Descargar PDF</button>
      </div>
    </div>
  );
};

export default ListaEstudiantesTable;