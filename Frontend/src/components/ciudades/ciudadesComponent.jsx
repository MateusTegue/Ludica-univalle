import React from 'react';

const CiudadesSelect = ({ value, onChange, name = "estudiante.ciudad" }) => {
  return (
    <select name={name} value={value} onChange={onChange} className="input">
      <option value="">Seleccione una ciudad</option>
      <option value="Buga">Buga</option>
      <option value="Cali">Cali</option>
      <option value="Candelaria">Candelaria</option>
      <option value="Cartago">Cartago</option>
      <option value="Dagua">Dagua</option>
      <option value="Florida">Florida</option>
      <option value="Pradera">Pradera</option>
      <option value="Palmira">Palmira</option>
      <option value="Restrepo">Restrepo</option>
      <option value="Tulua">Tulua</option>
      <option value="Yumbo">Yumbo</option>
      <option value="Zarzal">Zarzal</option>
    </select>
  );
};

export default CiudadesSelect;