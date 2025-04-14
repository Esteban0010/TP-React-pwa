import React,{useState} from 'react'
import CardMovie from '../../components/cardMovie/CardMovie'
import InputMovie from '../../components/inputMovie/InputMovie'
import style from "./Home.module.css"

function Home() {
  const filterGenTipo = ["genero","tipo"];
    const [movies,setMovies]=useState([])
    const [inputMovie,setInputMovie]=useState({
        titulo:"",
        director:"",
        genero:"",
        tipo:"",
        rating: 0,
        anio:"2025-12-12"
    });

     const handleChangeVista = (e) => {
        const {  value } = e.target
    let res=false;
    
        if(vista){
    res=false;
        }else{
          res=true;
        }
      }
    const handleChange = (e) => {
      const { name, value } = e.target
      setInputMovie({ ...inputMovie, [name]: value })
      console.log(inputMovie)
    }
        //agregar pelicula
  
        const agregarPelicula = () => {
          setMovies([...movies, inputMovie])
          setInputMovie({ // resetea el formulario
            titulo: "",
            director: "",
            genero: "",
            tipo: "",
            rating: "",
            anio: "",
            vista:false
          })
        }
  return (
    <div>
      <div>
        <h1>Agregar Película</h1>
        <InputMovie nombre="titulo" type={"text"} value={inputMovie.titulo} onChange={handleChange} />
        <InputMovie nombre="director" type={"text"} value={inputMovie.director} onChange={handleChange} />
        <InputMovie nombre="genero" type={"text"} value={inputMovie.genero} onChange={handleChange} />
        <InputMovie nombre="tipo" type={"text"} value={inputMovie.tipo} onChange={handleChange} />
        <InputMovie nombre="rating" type={"number"} value={inputMovie.rating} onChange={handleChange} />
        <InputMovie nombre="anio"  type={"date"} value={inputMovie.anio} onChange={handleChange} />
        <InputMovie nombre="vista"  type={"checkbox"} value={inputMovie.vista} onChange={handleChange} />
        <button onClick={agregarPelicula}>
          <h1>Agregar Pelicula</h1>
        </button>   
      </div>
      <div>
        
      </div>
      <div className={style.container_movie}>
      <div>
      <h1>Peliculas vistas</h1>
 {movies.length > 0 ? (
        movies.map((pelicula,index) => (pelicula.vista?
          <CardMovie 
            key={index}
            titulo={pelicula.titulo}
            director={pelicula.director}
            genero={pelicula.genero}
            anio={pelicula.anio}
            rating={pelicula.rating}
            vista={pelicula.vista}
            handleChangeVista={handleChangeVista}
          />:null
        ))
      ) : (
        <p>No hay películas disponibles</p>
      )}
    </div>
    <div>
      <h1>Peliculas que no viste</h1>
    {movies.length > 0 ? (
        movies.map((pelicula,index) => (!pelicula.vista?
          <CardMovie 
            key={index}
            titulo={pelicula.titulo}
            director={pelicula.director}
            genero={pelicula.genero}
            anio={pelicula.anio}
            rating={pelicula.rating}
            vista={pelicula.vista}
            handleChangeVista={handleChangeVista}
          />:null
        ))
      ) : (
        <p>No hay películas disponibles</p>
      )}
    </div>
    </div>
    </div>
  )
}

export default Home

