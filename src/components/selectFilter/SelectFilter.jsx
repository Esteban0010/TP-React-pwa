import React from 'react';
import style from './SelectFilter.module.css';
function SelectFilter({ nombre, options, valor, onChange ,error}) {
  const optionsList = options || []
  return (
    <div className={style.selectFilter}>
     
      <select
      className={style.select}
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
      <label className={style.label} htmlFor={nombre}>{nombre}:</label>
       {error && <p className={style.error_text}>{error}</p>}
    </div>
  );
}

export default SelectFilter;