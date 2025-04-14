import React from 'react'

function CardMovie({titulo,director,anio,genero,rating,tipo}) {
  return (
    <div>
      <h2>{titulo}</h2>
      <h2>{director}</h2>
      <h2>{anio}</h2>
      <h2>{genero}</h2>
      <h2>{rating}</h2>
      <h2>{tipo}</h2>
      
    </div>
  )
}

export default CardMovie

