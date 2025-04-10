import React,{useState} from 'react'
import CardMovie from '../../components/cardMovie/CardMovie'
import BtnAgragarQuitar from '../../components/btnAgregarQuitar/BtnAgragarQuitar'

function Home() {
    const [movies,SetMovies]=useState([{
        id:1,
        titulo:"pelicula",
        director:"director",
        genero:"gen",rating:"2",
        tipo:"aa",
        anio:222}])//ejemplo
  return (
    <div>
        <div>
            <input type="text" />
        </div>
 {movies.length > 0 ? (
        movies.map((pelicula) => (
          <CardMovie 
            key={pelicula.id}
            titulo={pelicula.titulo}
            director={pelicula.director}
            genero={pelicula.genero}
            anio={pelicula.anio}
            rating={pelicula.rating}
          />
        ))
      ) : (
        <p>No hay películas disponibles</p>
      )}
    </div>
  )
}

export default Home

