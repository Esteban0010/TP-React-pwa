import usePelis from '../../hooks/usePelis'
import CardMovie from '../../components/cardMovie/CardMovie'
import InputMovie from '../../components/inputMovie/InputMovie'
import SelectFilter from '../../components/selectFilter/SelectFilter';
import MovieContainer from '../../components/movieContainer/MovieContainer';
import Titulo from '../../components/Titulo/Titulo';
import style from "./Home.module.css"

function Home() {

  const {
    // handleFiltroChange,
    handleRemove,
    handleChangeInput,
    agregarPelicula,
    inputMovie,
    peliculasFiltradas
  } = usePelis()


  return (
    <div>
      <Titulo />
      <div>
        <InputMovie nombre="titulo" type={"text"} value={inputMovie.titulo} onChange={handleChangeInput} />
        <InputMovie nombre="director" type={"text"} value={inputMovie.director} onChange={handleChangeInput} />
        <InputMovie nombre="genero" type={"text"} value={inputMovie.genero} onChange={handleChangeInput} />
        <InputMovie nombre="tipo" type={"text"} value={inputMovie.tipo} onChange={handleChangeInput} />
        <InputMovie nombre="rating" type={"number"} value={inputMovie.rating} onChange={handleChangeInput} />
        <InputMovie nombre="anio" type={"date"} value={inputMovie.anio} onChange={handleChangeInput} />
        <InputMovie nombre="vista" type={"checkbox"} checked={inputMovie.vista} onChange={handleChangeInput} />
        <button onClick={agregarPelicula}>
          Agregar Pelicula
        </button>
      </div>
      {/* <div>
        <SelectFilter onChange={handleFiltroChange} options={filterType} nombre={"tipo"} />
        <SelectFilter onChange={handleFiltroChange} options={genders} nombre={"genero"} />
        <SelectFilter onChange={handleFiltroChange} options={filterType} nombre={"tipo"} />
      </div> */}
      <div className={style.container_movie}>
        <MovieContainer movies={peliculasFiltradas} handleRemove={handleRemove} />
      </div>
    </div >
  )
}

export default Home

