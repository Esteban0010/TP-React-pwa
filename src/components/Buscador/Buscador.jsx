import React from 'react';
// import './buscador.css';

export default function Buscador({ texto, onChange }) {
  return (
    <div className='buscador'>
      <input 
        type="text" 
        placeholder="Buscar por título o director"
        value={texto}
        onChange={onChange}
      />
    </div>
  );
}
