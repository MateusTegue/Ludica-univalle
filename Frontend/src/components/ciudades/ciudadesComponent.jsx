import React from 'react';

const CiudadesSelect = ({ value, onChange, name = "estudiante.ciudad" }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
        <option value="">Seleccione una ciudad</option>
        <option value="Bogotá">Bogotá</option>
        <option value="Medellín">Medellín</option>
        <option value="Cali">Cali</option>
        <option value="Barranquilla">Barranquilla</option>
        <option value="Cartagena">Cartagena</option>
        <option value="Bucaramanga">Bucaramanga</option>
        <option value="Pereira">Pereira</option>
        </select>
  );
};

export default CiudadesSelect;