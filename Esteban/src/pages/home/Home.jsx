import React,{useState,useEffect} from 'react'
import CardMovie from '../../components/cardMovie/CardMovie'
import InputMovie from '../../components/inputMovie/InputMovie'
import style from "./Home.module.css"
import SelectFilter from '../../components/selectFilter/SelectFilter';
import MovieContainer from '../../components/movieContainer/MovieContainer';

function Home() {
  const filterType  = ["peliculas", "series"];
  const [filtros, setFiltros] = useState({ genero: "", tipo: "" });
  const genders = ["acción", "comedia", "terror", "drama"];
    const [movies,setMovies]=useState([]);
    const [moviesFilter,setMoviesFilter]=useState([])
    const [inputMovie,setInputMovie]=useState({
        titulo:"",
        director:"",
        genero:"",
        tipo:"",
        rating: 0,
        anio:"2025-12-12",
        vista:false
    });

    const handleFiltroChange = (e) => {
      const { name, value } = e.target;
      setFiltros(prev => ({ ...prev, [name]: value }));
      console.log(filtros)
    };

   const handleRemove=(id)=>{
    setMovies(movies.filter(mv => mv.id !== id))
   }
   
   const handleChangeInput = (e) => {
      const { name, value, type,checked } = e.target
      const newValue = type === "checkbox" ? checked : value;
      setInputMovie(prev => ({
        ...prev,
        [name]: newValue
      }));
      
    }
  
   const agregarPelicula = () => {
          inputMovie.id = Date.now()
      
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
          console.log(movies)
        }

        const peliculasFiltradas = movies.filter((m) => {
          return (!filtros.genero || m.genero === filtros.genero) &&
                 (!filtros.tipo || m.tipo === filtros.tipo);
        });
        console.log(peliculasFiltradas)
     
  return (
    <div>
      <div>
        <h1>Agregar Película</h1>
        <InputMovie nombre="titulo" type={"text"} value={inputMovie.titulo} onChange={handleChangeInput} />
        <InputMovie nombre="director" type={"text"} value={inputMovie.director} onChange={handleChangeInput} />
        <InputMovie nombre="genero" type={"text"} value={inputMovie.genero} onChange={handleChangeInput} />
        <InputMovie nombre="tipo" type={"text"} value={inputMovie.tipo} onChange={handleChangeInput} />
        <InputMovie nombre="rating" type={"number"} value={inputMovie.rating} onChange={handleChangeInput} />
        <InputMovie nombre="anio"  type={"date"} value={inputMovie.anio} onChange={handleChangeInput} />
        <InputMovie nombre="vista"  type={"checkbox"}  checked={inputMovie.vista}  onChange={handleChangeInput} />
        <button onClick={agregarPelicula}>
          Agregar Pelicula
        </button>   
      </div>
      <div>
        <SelectFilter onChange={handleFiltroChange} options={filterType} nombre={"tipo"}/>
        <SelectFilter onChange={handleFiltroChange} options={genders} nombre={"genero"}/>
        <SelectFilter onChange={handleFiltroChange} options={filterType} nombre={"tipo"}/>
      </div>
      <div className={style.container_movie}>
      <MovieContainer movies={peliculasFiltradas} handleRemove={handleRemove} />
    </div>
    </div>
  )
}

export default Home

