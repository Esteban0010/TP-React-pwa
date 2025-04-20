import { useState, useEffect } from 'react'


function usePelis() {
    const [filtros, setFiltros] = useState({ Genero: "", Tipo: "" });
    const [movies, setMovies] = useState(() => {
        const guardarArray = localStorage.getItem("movies")
        const parsearArray = JSON.parse(guardarArray)
        return parsearArray || []
    })
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
        if (enEdicion) return

        const newMovie = { ...inputMovie, id: Date.now() }
        setMovies((prevMovies) => [...prevMovies, newMovie])
        setInputMovie({
            Titulo: "",
            Director: "",
            Genero: "",
            Tipo: "",
            Rating: 0,
            Anio: "",
            Vista: false,
        })
        handleCerrarModal()
    }


    const peliculasFiltradas = movies.filter((m) => {
        return (!filtros.Genero || m.Genero === filtros.Genero) &&
            (!filtros.Tipo || m.Tipo === filtros.Tipo);
    });
    // console.log(peliculasFiltradas)

    const handleAbrirModal = (item = null) => {
        setEnEdicion(item !== null)
        setSelectedItem(item)

        if (item === null) {
            setInputMovie({
                Titulo: "",
                Director: "",
                Genero: "",
                Tipo: "",
                Rating: 0,
                Anio: "",
                Vista: false
            })
        } else {
            setInputMovie({
                id: item.id,
                Titulo: item.Titulo || "",
                Director: item.Director || "",
                Genero: item.Genero || "",
                Tipo: item.Tipo || "",
                Rating: item.Rating || 0,
                Anio: item.Anio || "",
                Vista: !!item.Vista
            })
        }

        setAbreModal(true)
    }

    const handleCerrarModal = () => {
        setSelectedItem(null)
        setAbreModal(false)
        setEnEdicion(false)
    }

    const handleEditar = (item) => {
        const open = true
        setSelectedItem(item)
        setEnEdicion(true)
        setAbreModal(open)
    }

    const handleEditarMovie = (item) => {
        const newMovies = movies.map((movie) =>
            movie.id === item.id ? item : movie
        )
        setMovies(newMovies)
        handleCerrarModal()
    }

    // console.log(typeof (movies))

    useEffect(() => {
        if (selectedItem && enEdicion) {
            setInputMovie(selectedItem)
        }
    }, [selectedItem, enEdicion])

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
        handleEditar,
        handleEditarMovie
    }

}


export default usePelis