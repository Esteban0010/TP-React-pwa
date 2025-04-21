import styles from "./Contador.module.css"

const Contador = ({ countGenero }) => {
    return (
        <div>
            <h3>Cantidad de Géneros</h3>
            <ul className={styles}>
                {Object.entries(countGenero).map(([genero, count]) => (
                    <li key={genero}>
                        <strong>{genero}:</strong> {count}
                    </li>
                ))}
                <li></li>
            </ul>
        </div>
    )
}

export default Contador