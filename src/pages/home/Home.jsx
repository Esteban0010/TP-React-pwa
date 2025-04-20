import usePelis from '../../hooks/usePelis'
import MovieContainer from '../../components/movieContainer/MovieContainer';
import Titulo from '../../components/Titulo/Titulo';
import Formulario from '../../components/Formulario/Formulario';
import Modal from '../../components/Modal/Modal';
import style from "./Home.module.css"

function Home() {

  const {
    // handleFiltroChange,
    handleRemove,
    handleChangeInput,
    agregarPelicula,
    inputMovie,
    peliculasFiltradas,
    handleAbrirModal,
    handleCerrarModal,
    abrirModal,
    handleEditarMovie,
    enEdicion,
    selectedItem
  } = usePelis()


  return (
    <div>
      <Titulo titulo={"Patricio Dev y sus Peliculitas de React"} />
      <button onClick={handleAbrirModal}>Agregar Película</button>
      <Modal abrirModal={abrirModal} cerrarModal={handleCerrarModal}>
        <Formulario
          inputMovie={inputMovie}
          handleChangeInput={handleChangeInput}
          agregarPelicula={agregarPelicula}
          selectedItem={selectedItem}
          handleEditarMovie={handleEditarMovie}
          enEdicion={enEdicion}
        />
      </Modal>

      <div className={style.container_movie}>
        <MovieContainer movies={peliculasFiltradas} handleRemove={handleRemove} handleEditarMovie={handleAbrirModal} />
      </div>
    </div >
  )
}

export default Home

