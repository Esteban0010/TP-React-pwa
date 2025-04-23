import { useState, useEffect } from 'react'


function usePelis() {
    const [busqueda, setBusqueda] = useState("");
    const handleBusquedaChange = (e) => {
        setBusqueda(e.target.value.toLowerCase()); 
    };

    const [errores, setErrores] = useState({});
    const [filtros, setFiltros] = useState({ Genero: "", Tipo: "" ,Anio:"", Vista: ""});
    // const [filtros, setFiltros] = useState({ Genero: "", Tipo: "", Vista: "" });

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

    const validarCampos = (inputMovie, peliculasExistentes = []) => {
        const errores = {};
        const camposObligatorios = ["Titulo", "Director", "Rating", "Anio", "Tipo", "Genero"];
      
        camposObligatorios.forEach((campo) => {
          const valor = inputMovie[campo]?.toString().trim();
      
          if (!valor) {
            errores[campo] = "Este campo es obligatorio";
            return;
          }
      
          switch (campo) {
            case "Titulo":
              if (valor.length < 3 || !/^[A-Za-z0-9\s]+$/.test(valor)) {
                errores[campo] = "Debe tener al menos 3 caracteres alfanuméricos";
              }
              if (peliculasExistentes.some(p => p.Titulo.toLowerCase() === valor.toLowerCase())) {
                errores[campo] = "Ya existe una película con ese título";
              }
              break;
      
            case "Director":
              if (valor.length < 5 || !/^[A-Za-z\s]+$/.test(valor)) {
                errores[campo] = "Debe tener al menos 5 letras y solo texto";
              }
              break;
      
            case "Rating":
              const rating = parseFloat(valor);
              if (isNaN(rating) || rating < 1 || rating > 10) {
                errores[campo] = "Debe ser un número entre 1 y 10";
              } else if (!/^\d{1,2}(\.\d{1})?$/.test(valor)) {
                errores[campo] = "Máximo un decimal permitido";
              }
              break;
      
            case "Anio":
              const fecha = new Date(valor);
              const anio = fecha.getFullYear();
              const hoy = new Date();
              if (isNaN(anio) || anio < 1900 || fecha > hoy) {
                errores[campo] = `Debe ser una fecha válida entre 1900 y ${hoy.getFullYear()}`;
              }
              break;
      
            case "Tipo":
            case "Genero":
              if (valor === "Seleccionar" || valor === "") {
                errores[campo] = `Seleccioná un ${campo.toLowerCase()}`;
              }
              break;
      
            default:
              break;
          }
        });
      
        return errores;
      };

    const agregarPelicula = () => {
        const erroresValidacion = validarCampos(inputMovie, movies); // movies = películas existentes
        setErrores(erroresValidacion);
      
        // Si hay errores, cancelamos la acción
        if (Object.keys(erroresValidacion).length > 0) return;
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
    
        const coincideGenero = !filtros.Genero || m.Genero === filtros.Genero;
        const coincideTipo = !filtros.Tipo || m.Tipo === filtros.Tipo;
        const coincideAnio = !filtros.Anio || anioSolo === filtros.Anio;
        const coincideVista =
            !filtros.Vista ||
            (filtros.Vista === "Vistas" && m.Vista) ||
            (filtros.Vista === "No vistas" && !m.Vista);
         const coincideBusqueda =
        !busqueda ||
        m.Titulo?.toLowerCase().includes(busqueda.toLowerCase()) ||
        m.Director?.toLowerCase().includes(busqueda.toLowerCase());
    
        return coincideGenero && coincideTipo && coincideAnio && coincideVista && coincideBusqueda ;
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



    const generosUnicos = [... new Set(movies.map(movie => movie.Genero))].filter(Boolean)
    const tiposUnicos = [... new Set(movies.map(movie => movie.Tipo))].filter(Boolean)

    return {
        busqueda,
        handleBusquedaChange,
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
        anios,
        errores
    }

}


export default usePelis