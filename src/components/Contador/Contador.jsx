import styles from "./Contador.module.css";

const Contador = ({ countGenero }) => {
  return (
    <div className={styles.contador}>
      <h3 className={styles.titulo}>Cantidad de Géneros</h3>
      <ul className={styles.lista}>
        {Object.entries(countGenero).map(([genero, count]) => (
          <li key={genero}>
            <strong>{genero}:</strong> {count}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Contador;
