import InputMovie from "../inputMovie/InputMovie"
import SelectFilter from "../selectFilter/SelectFilter"
import Button from "../BtnAgregarEditar/Button"

const Formulario = ({ inputMovie, handleChangeInput, agregarPelicula, enEdicion, handleEditarMovie }) => {
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
        <>
            <InputMovie nombre="Titulo" type={"text"} value={inputMovie.Titulo} onChange={handleChangeInput} />
            <InputMovie nombre="Director" type={"text"} value={inputMovie.Director} onChange={handleChangeInput} />
            <InputMovie nombre="Rating" type={"number"} value={inputMovie.Rating} onChange={handleChangeInput} />
            <InputMovie nombre="Anio" type={"date"} value={inputMovie.Anio} onChange={handleChangeInput} />
            <InputMovie nombre="Vista" type={"checkbox"} checked={inputMovie.Vista} onChange={handleChangeInput} />
            <SelectFilter onChange={handleChangeInput} options={tipos} nombre={"Tipo"} value={inputMovie.Tipo} />
            <SelectFilter onChange={handleChangeInput} options={generos} nombre={"Genero"} value={inputMovie.Genero} />
            <Button
                className={``}
                text={enEdicion ? "Guardar cambios" : "Agregar"}
                onClick={handleSubmit}
            />
        </>

    )
}

export default Formulario