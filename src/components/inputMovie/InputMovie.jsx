// import React from 'react'

function InputMovie({ nombre, value, checked, onChange, type }) {
  const inputValue = type === "date"
    ? value || ""
    : (type === "number" ? (value ?? 0) : (value || ""));
  return (
    <div>
      <label htmlFor={nombre}>{nombre}</label>
      <input
        type={type}
        name={nombre}
        value={inputValue}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
      />
    </div>
  )
}

export default InputMovie
