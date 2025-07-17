import React from 'react';

const CarreraSelect = ({ value, onChange, name = "estudiante.carrera" }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Seleccione un programa</option>
      <option value="TECNOLOGÍA ELECTRÓNICA">TECNOLOGÍA ELECTRÓNICA</option>
      <option value="TECNOLOGÍA EN SISTEMAS DE INFORMACIÓN">TECNOLOGÍA EN SISTEMAS DE INFORMACIÓN</option>
      <option value="TECNOLOGÍA EN ALIMENTOS">TECNOLOGÍA EN ALIMENTOS</option>
      <option value="TECNOLOGÍA AGROAMBIENTAL">TECNOLOGÍA AGROAMBIENTAL</option>
      <option value="TECNOLOGÍA EN CONSTRUCCIONES SOLDADAS">TECNOLOGÍA EN CONSTRUCCIONES SOLDADAS</option>
      <option value="TECNOLOGÍA EN MANTENIMIENTO DE SISTEMAS">TECNOLOGÍA EN MANTENIMIENTO DE SISTEMAS</option>
      <option value="TECNOLOGÍA EN DESARROLLO DE SOFTWARE">TECNOLOGÍA EN DESARROLLO DE SOFTWARE</option>
      <option value="TECNOLOGÍA EN ELECTRÓNICA INDUSTRIAL">TECNOLOGÍA EN ELECTRÓNICA INDUSTRIAL</option>
      <option value="TECNOLOGÍA DE PROCESAMIENTO DE ALIMENTOS">TECNOLOGÍA DE PROCESAMIENTO DE ALIMENTOS</option>
      <option value="INGENIERÍA INDUSTRIAL">INGENIERÍA INDUSTRIAL</option>
      <option value="TECNOLOGÍA EN AGROFORESTERÍA">TECNOLOGÍA EN AGROFORESTERÍA</option>
      <option value="TECNOLOGÍA EN MANEJO DE LA PRODUCCIÓN AG">TECNOLOGÍA EN MANEJO DE LA PRODUCCIÓN AG</option>
      <option value="MAESTRÍA EN BIOTECNOLOGÍA">MAESTRÍA EN BIOTECNOLOGÍA</option>
      <option value="LICENCIATURA EN LITERATURA">LICENCIATURA EN LITERATURA</option>
      <option value="TECNOLOGÍA EN GESTIÓN LOGÍSTICA">TECNOLOGÍA EN GESTIÓN LOGÍSTICA</option>
      <option value="CONTADURÍA PÚBLICA">CONTADURÍA PÚBLICA</option>
      <option value="ADMINISTRACIÓN DE EMPRESAS">ADMINISTRACIÓN DE EMPRESAS</option>
      <option value="MAESTRÍA EN GERENCIA DE PROYECTOS">MAESTRÍA EN GERENCIA DE PROYECTOS</option>
      <option value="LICENCIATURA EN EDUCACIÓN FÍSICA Y DEPORTE">LICENCIATURA EN EDUCACIÓN FÍSICA Y DEPORTE</option>
    </select>
  );
};

export default CarreraSelect;
