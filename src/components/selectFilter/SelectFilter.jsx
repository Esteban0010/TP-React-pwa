import React from 'react'

function SelectFilter({ onChange, options = [], nombre }) {
  return (
    <div><label htmlFor={nombre}>{nombre}</label>
      <select onChange={onChange} name={nombre} id="nombre">
        {
          options.map((option, index) => (
            <option key={index} value={option}>{option}</option>
          ))
        }
      </select>
    </div>
  )
}

export default SelectFilter