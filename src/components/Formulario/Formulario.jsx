import InputMovie from "../inputMovie/InputMovie"

const Formulario = ({ inputMovie, handleChangeInput, agregarPelicula }) => {
    return (
        <div>
            <InputMovie nombre="Titulo" type={"text"} value={inputMovie.titulo} onChange={handleChangeInput} />
            <InputMovie nombre="Director" type={"text"} value={inputMovie.director} onChange={handleChangeInput} />
            <InputMovie nombre="Genero" type={"text"} value={inputMovie.genero} onChange={handleChangeInput} />
            <InputMovie nombre="Tipo" type={"text"} value={inputMovie.tipo} onChange={handleChangeInput} />
            <InputMovie nombre="Rating" type={"number"} value={inputMovie.rating} onChange={handleChangeInput} />
            <InputMovie nombre="Anio" type={"date"} value={inputMovie.anio} onChange={handleChangeInput} />
            <InputMovie nombre="Vista" type={"checkbox"} checked={inputMovie.vista} onChange={handleChangeInput} />
            <button onClick={agregarPelicula}></button>
        </div>
    )
}

export default Formulario