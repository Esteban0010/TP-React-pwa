import React from 'react';

function SelectFilter({ nombre, options, valor, onChange }) {
  const optionsList = options || []
  return (
    <div>
      <label htmlFor={nombre}>{nombre}:</label>
      <select
        name={nombre}
        id={nombre}
        value={valor}
        onChange={onChange}
      >
        <option value="">Todos</option>
        {optionsList.map((opcion) => (
          <option key={opcion} value={opcion}>
            {opcion}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectFilter;