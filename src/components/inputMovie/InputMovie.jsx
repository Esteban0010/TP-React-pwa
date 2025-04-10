import React from 'react'

function InputMovie({nombre}) {
  return (
    <div>
        <label htmlFor={nombre}>{nombre}</label>
      <input
        type="text"
        name={nombre}
       
        placeholder={`Ingresá ${nombre}`}
      />
    </div>
  )
}

export default InputMovie
