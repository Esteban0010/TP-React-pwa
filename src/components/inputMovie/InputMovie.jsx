import React from 'react'

function InputMovie({nombre,value,checked, onChange,type}) {
  return (
    <div>
        <label htmlFor={nombre}>{nombre}</label>
        <input
        name={nombre}
        type={type}
        value={type === "checkbox" ? undefined : value}
        checked={type === "checkbox" ? checked : undefined}
        onChange={onChange}
      />
    </div>
  )
}

export default InputMovie
