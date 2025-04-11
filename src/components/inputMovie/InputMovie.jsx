import React from 'react'

function InputMovie({nombre,value, onChange,type}) {
  return (
    <div>
        <label htmlFor={nombre}>{nombre}</label>
      <input
         type={type}
         name={nombre}
         value={value}
         onChange={onChange}
         placeholder={`Ingresá ${nombre}`}
      />
    </div>
  )
}

export default InputMovie
