import React from 'react';
import CardMovie from '../cardMovie/CardMovie';
import styles from './MovieContainer.module.css';

function MovieContainer({ movies, handleRemove, handleEditar, handleMarcarVista}) {
  return (
    <div className={styles.container}>
      {movies.map((movie) => (
        <CardMovie
          key={movie.id}
          id={movie.id} 
          titulo={movie.Titulo}
          director={movie.Director}
          anio={movie.Anio}
          genero={movie.Genero}
          rating={movie.Rating}
          tipo={movie.Tipo}
          vista={movie.Vista}
          handleEditar={() => handleEditar(movie)}
          handleRemove={() => handleRemove(movie.id)}
          handleMarcarVista={handleMarcarVista} // Nueva función
          

        />
      ))}
    </div>
  );
}

export default MovieContainer;
