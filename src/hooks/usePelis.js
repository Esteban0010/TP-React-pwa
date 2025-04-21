import { useState, useEffect } from 'react'


function usePelis() {
    const [filtros, setFiltros] = useState({ Genero: "", Tipo: "" ,Anio:""});
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
    // const [generoSeleccionado, setGeneroSeleccionado] = useState("Todos")
    // const [tipoSeleccionado, setTipoSeleccionado] = useState("Todos")
    // const [txtBusqueda, setTxtBusqueda] = useState("")

    useEffect(() => {
        localStorage.setItem("movies", JSON.stringify(movies))
    }, [movies])

    const handleFiltroChange = (e) => {
        const { name, value } = e.target
        console.log(`Filtro cambiado: ${name} = ${value}`)
        setFiltros(prev => ({ ...prev, [name]: value }))
    }

    const handleRemove = (id) => {
        setMovies(movies.filter(mv => mv.id !== id))
    }


    const handleMarcarVista = (id) => {
        setMovies(prev =>
          prev.map(movie =>
            movie.id === id ? { ...movie, Vista: !movie.Vista } : movie
          )
        );
      };
    



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
        const anioSolo = m.Anio?.slice(0, 4);
        return (!filtros.Genero || m.Genero === filtros.Genero) &&
            (!filtros.Tipo || m.Tipo === filtros.Tipo) &&
          (!filtros.Anio || anioSolo === filtros.Anio)
    });

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

    const countGenero = () => {
        return movies.reduce((count, movie) => {
            count[movie.Genero] = (count[movie.Genero] || 0) + 1
            return count
        }, {})
    }
    const contadorGeneroTotal = countGenero()
    console.log(contadorGeneroTotal)

    const countTipo = () => {
        return movies.reduce((count, movie) => {
            const tipo = movie.Tipo

            if (!count[tipo]) count[tipo] = { total: 0, pendientes: 0 }

            count[tipo].total += 1
            if (!movie.Vista) count[tipo].pendientes += 1

            return count
        }, {})
    }

    const movieTipo = countTipo()
    const moviesPendientes = movieTipo["Pelicula"]?.pendientes || 0
    const seriesPendientes = movieTipo["Serie"]?.pendientes || 0
    const anios = Array.from({ length: 2026 - 2000 }, (_, i) => 2000 + i);
    const contadorActivo = movies.filter(movie => !movie.Vista).length
    const contadorCompleto = movies.length - contadorActivo
    console.log("ya vi: " + contadorCompleto)

    console.log(peliculasFiltradas)

    // console.log("cantidad de pelis pendientes: " + moviesPendientes)
    // console.log("cantidad de series pendientes: " + seriesPendientes)

    // console.log(movies)

    const generosUnicos = [... new Set(movies.map(movie => movie.Genero))].filter(Boolean)
    const tiposUnicos = [... new Set(movies.map(movie => movie.Tipo))].filter(Boolean)

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
        handleEditarMovie,
        handleMarcarVista, //nuevo handle
        contadorGeneroTotal,
        moviesPendientes,
        seriesPendientes,
        filtros,
        generosUnicos,
        tiposUnicos,
        anios
    }

}


export default usePelis