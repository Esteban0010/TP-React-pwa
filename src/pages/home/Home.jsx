import React,{useState} from 'react'
import CardMovie from '../../components/cardMovie/CardMovie'
import BtnAgragarQuitar from '../../components/btnAgregarQuitar/BtnAgragarQuitar'
import InputMovie from '../../components/inputMovie/InputMovie'

function Home() {
    const [movies,setMovies]=useState([{
        id:1,
        titulo:"pelicula",
        director:"director",
        genero:"gen",rating:"2",
        tipo:"aa",
        anio:222}])//ejemplo


        //agregar pelicula
        function agregarPelicula(){
            let pelicula = movies;
            setMovies()
        }
  return (

    <div>
        <div>
        <InputMovie   nombre="titulo"/>
        <InputMovie   nombre="director"/>
        <InputMovie   nombre="genero"/>
        <InputMovie   nombre="anio"/>
        <InputMovie   nombre="rating"/>
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

