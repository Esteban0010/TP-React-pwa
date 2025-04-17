import React from 'react'
import CardMovie from '../cardMovie/CardMovie'

function MovieContainer({ movies, handleRemove }) {

  
    return (
      <div>
        {movies.length > 0 ? (
          movies.map((pelicula, index) => (
            <CardMovie 
              key={index}
              titulo={pelicula.titulo}
              director={pelicula.director}
              genero={pelicula.genero}
              anio={pelicula.anio}
              rating={pelicula.rating}
              vista={pelicula.vista}
              handleRemove={() => handleRemove(pelicula.id)}
            />
          ))
        ) : (
          <p>No hay películas disponibles</p>
        )}
      </div>
    );
  }
  

export default MovieContainer
