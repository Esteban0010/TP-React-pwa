import React from 'react';
import CardMovie from '../cardMovie/CardMovie';

function MovieContainer({ movies, handleRemove, handleEditar }) {
  return (
    <div>
      {movies.map((movie) => (
        <CardMovie
          key={movie.id}
          titulo={movie.Titulo}
          director={movie.Director}
          anio={movie.Anio}
          genero={movie.Genero}
          rating={movie.Rating}
          tipo={movie.Tipo}
          vista={movie.Vista}
          handleEditar={handleEditar}
          handleRemove={() => handleRemove(movie.id)}
        />
      ))}
    </div>
  );
}

export default MovieContainer;
