import React from 'react';
import styles from './Buscador.module.css';

export default function Buscador({ texto, onChange }) {
  return (
    <div className={styles.buscadorContainer}>
      <input 
        type="text" 
        placeholder="Buscar por título o director"
        value={texto}
        onChange={onChange}
        className={styles.input}
      />
    </div>
  );
}
