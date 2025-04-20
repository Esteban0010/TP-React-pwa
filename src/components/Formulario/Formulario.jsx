import InputMovie from "../inputMovie/InputMovie"
import SelectFilter from "../selectFilter/SelectFilter"
import Button from "../BtnAgregarEditar/Button"

const Formulario = ({ inputMovie, handleChangeInput, agregarPelicula }) => {
    const generos = ["Accion", "Comedia", "Drama", "Terror", "Ciencia Ficción"]
    const tipos = ["Pelicula", "Serie"]
    return (
        <>
            <InputMovie nombre="Titulo" type={"text"} value={inputMovie.titulo} onChange={handleChangeInput} />
            <InputMovie nombre="Director" type={"text"} value={inputMovie.director} onChange={handleChangeInput} />
            <InputMovie nombre="Rating" type={"number"} value={inputMovie.rating} onChange={handleChangeInput} />
            <InputMovie nombre="Anio" type={"date"} value={inputMovie.anio} onChange={handleChangeInput} />
            <InputMovie nombre="Vista" type={"checkbox"} checked={inputMovie.vista} onChange={handleChangeInput} />
            <SelectFilter onChange={handleChangeInput} options={tipos} nombre={"Tipo"} />
            <SelectFilter onChange={handleChangeInput} options={generos} nombre={"Genero"} />
            <Button className={``} text={"Agregar"} onClick={agregarPelicula} />
        </>

    )
}

export default Formulario