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

    const [selectedItem, setSelectedItem] = useState('')
    const [abrirModal, setAbreModal] = useState(false)
    const [enEdicion, setEnEdicion] = useState(false)

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
        const newMovie = { ...inputMovie, id: Date.now() };
        setMovies((prevMovies) => [...prevMovies, newMovie]);
        setInputMovie({ // resetea el formulario
            Titulo: "",
            Director: "",
            Genero: "",
            Tipo: "",
            Rating: 0,
            Anio: "",
            Vista: false,
        });
        handleCerrarModal()
    }


    const peliculasFiltradas = movies.filter((m) => {
        return (!filtros.Genero || m.Genero === filtros.Genero) &&
            (!filtros.Tipo || m.Tipo === filtros.Tipo);
    });
    console.log(peliculasFiltradas)

    const handleAbrirModal = (item = null) => {
        setSelectedItem(item)
        setEnEdicion(item !== null)
        setAbreModal(true)
    }

    const handleCerrarModal = () => {
        const noHayItem = null
        const close = false
        setSelectedItem(noHayItem)
        setAbreModal(close)
    }

    const handleEditarMovie = (item) => {
        const newMovies = movies.map((movie) =>
            movie.id === item.id ? item : movie
        )
        setMovies(newMovies)
        handleCerrarModal()
    }

    return {
        handleFiltroChange,
        handleRemove,
        handleChangeInput,
        agregarPelicula,
        inputMovie,
        peliculasFiltradas,
        handleAbrirModal,
        handleCerrarModal,
        selectedItem,
        abrirModal,
        enEdicion,
        handleEditarMovie
    }

}


export default usePelis