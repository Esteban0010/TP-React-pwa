import InputMovie from "../inputMovie/InputMovie"
import SelectFilter from "../selectFilter/SelectFilter"
import Button from "../BtnAgregarEditar/Button"
import styles from "./Formulario.module.css";
const Formulario = ({ inputMovie, handleChangeInput, agregarPelicula, enEdicion, handleEditarMovie,errores }) => {
    const generos = ["Accion", "Comedia", "Drama", "Terror", "Ciencia Ficción"]
    const tipos = ["Pelicula", "Serie"]

    const handleSubmit = () => {
        if (enEdicion) {
            handleEditarMovie(inputMovie)
        } else {
            agregarPelicula()
        }
    }

    return (
        <div className={styles.formulario}>
          <div className={styles.input_group}>
            <InputMovie nombre="Titulo"  error={errores.Titulo} type="text" value={inputMovie.Titulo} onChange={handleChangeInput} />
          </div>
          <div className={styles.input_group}>
            <InputMovie nombre="Director"  error={errores.Director} type="text" value={inputMovie.Director} onChange={handleChangeInput} />
          </div>
          <div className={styles.input_group}>
            <InputMovie nombre="Rating"  error={errores.Rating} type="number" value={inputMovie.Rating} onChange={handleChangeInput} />
          </div>
          <div className={styles.input_group}>
            <InputMovie nombre="Anio"  error={errores.Anio} type="date" value={inputMovie.Anio} onChange={handleChangeInput} />
          </div>
          {/* <div className={styles.checkbox_group}>
            <InputMovie nombre="Vista" type="checkbox" checked={inputMovie.Vista} onChange={handleChangeInput} />
          </div> */}
          <div className={styles.input_group}>
            <SelectFilter onChange={handleChangeInput}  error={errores.Tipo} options={tipos} nombre="Tipo" value={inputMovie.Tipo} />
          </div>
          <div className={styles.input_group}>
            <SelectFilter onChange={handleChangeInput}  error={errores.Genero} options={generos} nombre="Genero" value={inputMovie.Genero} />
          </div>
          <div className={styles.boton_submit}>
            <Button
              text={enEdicion ? "Guardar cambios" : "Agregar"}
              onClick={handleSubmit}
            />
          </div>
        </div>
      )
}

export default Formulario