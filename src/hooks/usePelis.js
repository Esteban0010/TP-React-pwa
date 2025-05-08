import { useState, useEffect } from 'react'


//es muy buena la intencion de este hook, pero como ven crecio mucho.
//podrian dividir este hook en hooks mas pequenos que esten mas cercanos a una tarea especifica
// por ej: useLocalStorageMovies, useMovieFilters, useMovieForm y dejar lo restante aca.
//archivos largos === archivos dificiles de manejar en el futuro.


function usePelis() {
  const [busqueda, setBusqueda] = useState("");
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value.toLowerCase());
  };

  const [errores, setErrores] = useState({});
  const [filtros, setFiltros] = useState({ Genero: "", Tipo: "", Anio: "", Vista: "No vistas", Rating: "" });


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
          if (valor.length < 3 || !/^[\p{L}\d\s:!?'".,&()-]+$/u.test(valor)) {
            errores[campo] = "Debe tener al menos 3 caracteres y ser un título válido";
          }
          if (peliculasExistentes.some(p => p.Titulo.toLowerCase() === valor.toLowerCase())) {
            errores[campo] = "Ya existe una película o serie con ese título";
          }
          break;

        case "Director":
          if (valor.length < 3 || !/^[\p{L}\d\s:!?'".,&()-]+$/u.test(valor)) {
            errores[campo] = "Debe tener al menos 5 letras y solo caracteres válidos en un nombre";
          }
          break;

        case "Rating":
          {
            const rating = parseFloat(valor);
            if (isNaN(rating) || rating < 1 || rating > 5) {
              errores[campo] = "Debe ser un número entero entre 1 y 5";
            } else if (!/^0?[1-5]$/.test(valor)) {
              errores[campo] = "No se permiten decimales ni números fuera del rango 1-5";
            }
            break;
          }

        case "Anio":
          {
            const anio = parseInt(valor);
            const actual = new Date().getFullYear();
            if (isNaN(anio) || anio < 1900 || anio > actual) {
              errores[campo] = `Debe estar entre 1900 y ${actual}`;
            }
            break;
          }

        case "Tipo":
          if (!["Pelicula", "Serie"].includes(valor)) {
            errores[campo] = "Seleccioná un tipo válido";
          }
          break;

        case "Genero":
          if (!/^[\p{L}\s,]+$/u.test(valor) || valor.length < 3) {
            errores[campo] = "Seleccioná un género válido (mínimo 3 letras)";
          }
          break;

        default:
          break;
      }
    });

    return errores;
  };


  const handleSubmitFormulario = () => {
    const erroresValidacion = validarCampos(inputMovie, movies.filter(p => p.id !== inputMovie.id)); // excluye a sí misma
    setErrores(erroresValidacion);

    if (Object.keys(erroresValidacion).length > 0) return;

    if (enEdicion) {
      handleEditarMovie(inputMovie);
    } else {
      agregarPelicula();
    }
  };


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

    const coincideRating =
      !filtros.Rating || Number(m.Rating) === Number(filtros.Rating);

    return (
      coincideGenero &&
      coincideTipo &&
      coincideAnio &&
      coincideVista &&
      coincideBusqueda &&
      coincideRating
    );
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
  const anios = Array.from({ length: 2026 - 1900 }, (_, i) => 1900 + i);
  const contadorActivo = movies.filter(movie => !movie.Vista).length
  const contadorCompleto = movies.length - contadorActivo
  //Borrar log
  console.log(`Tengo: ${contadorCompleto} sin ver`)



  const generosUnicos = [... new Set(movies.map(movie => movie.Genero))].filter(Boolean)
  const tiposUnicos = [... new Set(movies.map(movie => movie.Tipo))].filter(Boolean)

  return {
    busqueda,
    handleBusquedaChange,
    handleFiltroChange,
    handleRemove,
    handleChangeInput,
    agregarPelicula,
    setFiltros,
    inputMovie,
    peliculasFiltradas,
    handleAbrirModal,
    handleCerrarModal,
    setBusqueda,
    selectedItem,
    abrirModal,
    enEdicion,
    handleEditar,
    handleEditarMovie,
    handleMarcarVista,
    handleSubmitFormulario,
    contadorGeneroTotal,
    moviesPendientes,
    seriesPendientes,
    filtros,
    generosUnicos,
    tiposUnicos,
    anios,
    errores,
    // contadorCompleto
  }

}

export default usePelis