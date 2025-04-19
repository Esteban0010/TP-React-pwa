import usePelis from '../../hooks/usePelis'
import CardMovie from '../../components/cardMovie/CardMovie'
import InputMovie from '../../components/inputMovie/InputMovie'
import SelectFilter from '../../components/selectFilter/SelectFilter';
import MovieContainer from '../../components/movieContainer/MovieContainer';
import Titulo from '../../components/Titulo/Titulo';
import Formulario from '../../components/Formulario/Formulario';
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
        <Formulario inputMovie={inputMovie} handleChangeInput={handleChangeInput} agregarPelicula={agregarPelicula} />
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

