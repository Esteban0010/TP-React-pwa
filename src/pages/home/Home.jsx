import usePelis from '../../hooks/usePelis'
import MovieContainer from '../../components/movieContainer/MovieContainer';
import Titulo from '../../components/Titulo/Titulo';
import Formulario from '../../components/Formulario/Formulario';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/BtnAgregarEditar/Button';
import Contador from '../../components/Contador/Contador';
import SelectFilter from '../../components/selectFilter/SelectFilter';
import style from "./Home.module.css"

function Home() {

  const {
    handleFiltroChange,
    handleRemove,
    handleChangeInput,
    agregarPelicula,
    inputMovie,
    peliculasFiltradas,
    handleAbrirModal,
    handleCerrarModal,
    abrirModal,
    handleEditar,
    handleEditarMovie,
    enEdicion,
    selectedItem,
    contadorGeneroTotal,
    filtros,
    generosUnicos,
    tiposUnicos
  } = usePelis()

  return (
    <div>
      <Titulo titulo={"Patricio Dev y sus Peliculitas de React"} />
      <Button className={``} text={"Añadir peliculas y series"} onClick={() => handleAbrirModal()} />
      <SelectFilter nombre={"Tipos"} onChange={handleFiltroChange} value={filtros.Tipo} options={tiposUnicos} />
      <SelectFilter nombre={"Generos"} onChange={handleFiltroChange} value={filtros.Genero} options={generosUnicos} />
      <Modal abrirModal={abrirModal} cerrarModal={handleCerrarModal}>
        <Formulario
          inputMovie={inputMovie}
          handleChangeInput={handleChangeInput}
          agregarPelicula={agregarPelicula}
          selectedItem={selectedItem}
          enEdicion={enEdicion}
          handleEditarMovie={handleEditarMovie}
        />
      </Modal>

      <div className={style.container_movie}>
        <MovieContainer movies={peliculasFiltradas} handleRemove={handleRemove} handleEditar={handleEditar} />
      </div>
      <Contador countGenero={contadorGeneroTotal} />
    </div >
  )
}

export default Home

