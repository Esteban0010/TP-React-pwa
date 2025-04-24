import usePelis from '../../hooks/usePelis'
import MovieContainer from '../../components/movieContainer/MovieContainer';
import Titulo from '../../components/Titulo/Titulo';
import Formulario from '../../components/Formulario/Formulario';
import Modal from '../../components/Modal/Modal';
import Button from '../../components/BtnAgregarEditar/Button';
import Contador from '../../components/Contador/Contador';
import SelectFilter from '../../components/selectFilter/SelectFilter';
import style from "./Home.module.css"
import Buscador from '../../components/Buscador/Buscador';

function Home() {

  const {
    busqueda,
    handleBusquedaChange,
    handleFiltroChange,
    handleMarcarVista,
    handleRemove,
    handleChangeInput,
    agregarPelicula,
    handleSubmitFormulario,
    setBusqueda,
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
    tiposUnicos,
    setFiltros,
    anios,
    errores,
    // contadorCompleto
  } = usePelis()

  return (
    <div>
      <Titulo titulo={"Patricio Dev y sus Peliculitas de React"} />
      {/* 
      <div className="buscadorWrapper"> 
      <Buscador  texto={busqueda} onChange={handleBusquedaChange} />
        <Button className="buttonSpacing" text={"Añadir peliculas y series"} onClick={() => handleAbrirModal()} />
      </div> */}
      <div className={style.topBar}>
        <Buscador texto={busqueda} onChange={handleBusquedaChange} />
        <Button className={``} text={"Añadir peliculas y series"} onClick={() => handleAbrirModal()} />
        <Contador countGenero={contadorGeneroTotal} />

      </div>

      <div className={style.filtrosContainer}>
        <SelectFilter
          nombre={"Tipo"}
          onChange={handleFiltroChange}
          value={filtros.Tipo}
          options={tiposUnicos}
        />
        <SelectFilter
          nombre={"Genero"}
          onChange={handleFiltroChange}
          value={filtros.Genero}
          options={generosUnicos}
        />
        <SelectFilter
          nombre={"Anio"}
          onChange={handleFiltroChange}
          value={filtros.Anio}
          options={anios}
        />
        <SelectFilter
          nombre={"Rating"}
          onChange={handleFiltroChange}
          value={filtros.Rating}
          options={["1", "2", "3", "4", "5"]}
        />
        <SelectFilter
          nombre="Vista"
          value={filtros.Vista}
          onChange={handleFiltroChange}
          options={["Vistas", "No vistas"]}
        />
        {(filtros.Tipo || filtros.Genero || filtros.Vista || filtros.Anio || filtros.Rating) ? (
          <button
            className={style.base}
            onClick={() => {
              setFiltros({
                Genero: "",
                Tipo: "",
                Anio: "",
                Vista: "",
                Rating: ""
              });
              setBusqueda("");
            }}
          >
            Limpiar filtros
          </button>
        ) : null}
      </div>
      <Modal abrirModal={abrirModal} cerrarModal={handleCerrarModal}>
        <Formulario

          inputMovie={inputMovie}
          handleChangeInput={handleChangeInput}
          agregarPelicula={agregarPelicula}
          selectedItem={selectedItem}
          enEdicion={enEdicion}
          handleEditarMovie={handleEditarMovie}
          handleSubmit={handleSubmitFormulario}
          errores={errores}

        />
      </Modal>

      <div className={style.container_movie}>
        <MovieContainer
          movies={peliculasFiltradas}
          filters={filtros}
          handleRemove={handleRemove}
          handleEditar={handleEditar}
          handleMarcarVista={handleMarcarVista}
        />
      </div>
      {/* <Contador countGenero={contadorGeneroTotal} /> */}
    </div >
  )
}

export default Home

