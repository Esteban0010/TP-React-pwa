import { useState } from 'react'


function usePelis() {
    const filterType = ["peliculas", "series"];
    const [moviesFilter, setMoviesFilter] = useState([])

    const [filtros, setFiltros] = useState({ genero: "", tipo: "" });
    const [movies, setMovies] = useState([]);
    const [inputMovie, setInputMovie] = useState({
        titulo: "",
        director: "",
        genero: "",
        tipo: "",
        rating: 0,
        anio: 0,
        vista: false
    });

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
        console.log(filtros)
    };

    const handleRemove = (id) => {
        setMovies(movies.filter(mv => mv.id !== id))
    }

    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target
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
            vista: false
        })
        console.log(movies)
    }

    const peliculasFiltradas = movies.filter((m) => {
        return (!filtros.genero || m.genero === filtros.genero) &&
            (!filtros.tipo || m.tipo === filtros.tipo);
    });
    console.log(peliculasFiltradas)

    return {
        handleFiltroChange,
        handleRemove,
        handleChangeInput,
        agregarPelicula,
        inputMovie,
        peliculasFiltradas
    }

}


export default usePelis