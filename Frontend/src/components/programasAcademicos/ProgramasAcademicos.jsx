import React from 'react';

const CarreraSelect = ({ value, onChange, name = "estudiante.carrera" }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Seleccione una carrera</option>
      <option value="Ingeniería de Sistemas">Ingeniería de Sistemas</option>
      <option value="Ingeniería Electrónica">Ingeniería Electrónica</option>
      <option value="Administración de Empresas">Administración de Empresas</option>
      <option value="Contaduría Pública">Contaduría Pública</option>
      <option value="Psicología">Psicología</option>
      <option value="Derecho">Derecho</option>
    </select>
  );
};

export default CarreraSelect;
