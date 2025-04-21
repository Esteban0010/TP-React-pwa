import styles from './InputMovie.module.css'

function InputMovie({ nombre, value, checked, onChange, type }) {
  const inputValue = type === "date"
    ? value || ""
    : (type === "number" ? (value ?? 0) : (value || ""));

  return (
    <div className={styles.inputWrapper}>
      <input
        className={styles.inputField}
        type={type}
        name={nombre}
        placeholder={nombre}
        value={inputValue}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
      />
    </div>
  );
}

export default InputMovie;
