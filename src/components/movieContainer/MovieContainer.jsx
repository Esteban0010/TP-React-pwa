import React from 'react';
import CardMovie from '../cardMovie/CardMovie';
import styles from './MovieContainer.module.css';

function MovieContainer({ movies, handleRemove, handleEditar, handleMarcarVista, filters }) {
  const filtrosActivos = Object.values(filters).some(valor => valor !== "");
  return (
    <div className={styles.container}>
      {movies.length ? (movies.map((movie) => (
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
          handleMarcarVista={handleMarcarVista}


        />
      ))) : (filtrosActivos ? <h1>No hay resultados para este filtro</h1> :
        <h1>No hay peliculas registradas</h1>)}
    </div>
  );
}

export default MovieContainer;
