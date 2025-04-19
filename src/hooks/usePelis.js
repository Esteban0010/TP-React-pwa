import { useState, useEffect } from 'react'


function usePelis() {
    const [filtros, setFiltros] = useState({ Genero: "", Tipo: "" });
    const [movies, setMovies] = useState(() => {
        const guardarArray = localStorage.getItem("movies")
        const parsearArray = JSON.parse(guardarArray)
        return parsearArray || []
    });
    const [inputMovie, setInputMovie] = useState({
        Titulo: "",
        Director: "",
        Genero: "",
        Tipo: "",
        Rating: 0,
        Anio: "",
        Vista: false
    });

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies))
    }, [movies])

    const handleFiltroChange = (e) => {
        const { name, value } = e.target;
        setFiltros(prev => ({ ...prev, [name]: value }));
        console.log(filtros)
    };

    const handleRemove = (id) => {
        setMovies(movies.filter(mv => mv.id !== id))
    }

    const handleChangeInput = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === "checkbox" ? checked : value;

        setInputMovie((prev) => ({
            ...prev,
            [name]: newValue,

        }))
    }

    const agregarPelicula = () => {
        const newMovie = { ...inputMovie, id: Date.now() }

        setMovies((pmovies) => [...pmovies, newMovie])
        setInputMovie({ // resetea el formulario
            Titulo: "",
            Director: "",
            Genero: "",
            Tipo: "",
            Rating: 0,
            Anio: "",
            Vista: false
        })
        // console.log(movies)
    }

    const peliculasFiltradas = movies.filter((m) => {
        return (!filtros.Genero || m.Genero === filtros.enero) &&
            (!filtros.Tipo || m.Tipo === filtros.Tipo);
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