import { useState } from "react"
import { Items } from "../Items/Items"
import { ItemId, ValoresFiltros, type Item as ItemType } from "../../utils/types"
import { ESTADO_PELIS } from "../../utils/consts"
import { Footer } from "../Header_Footer/Footer"

const mockPeliculas = [
    {
        id: '1',
        title: 'Django Unchained',
        vista: false
    },
    {
        id: '2',
        title: 'Inglourious Basterds',
        vista: false
    },
    {
        id: '3',
        title: 'Kill Bill: Volumen I',
        vista: false
    }
]

const Home = () => {
    const [pelis, setPelis] = useState(mockPeliculas)
    const [filtroSeleccionado, setFiltroSeleccionado] = useState<ValoresFiltros>(ESTADO_PELIS.ACTIVE)

    const handleRemover = ({ id }: ItemId): void => {
        const nuevasPelis = pelis.filter(peli => peli.id !== id)
        setPelis(nuevasPelis)
    }

    // const handleCompletado = ({ id, vista }: { id: ItemId, vista: ItemVista }): void => {
    //     const nuevaPelis = pelis.map(peli => {
    //         if (id) {
    //             return {
    //                 ...peli,
    //                 vista
    //             }
    //         }
    //         return peli
    //     })
    //     setPelis(nuevaPelis)
    // }

    const handleCompletado = ({ id, vista }: Pick<ItemType, 'id' | 'vista'>): void => {
        const nuevaPelis = pelis.map(peli => {
            if (peli.id === id) {
                return {
                    ...peli,
                    vista
                }
            }
            return peli
        })
        setPelis(nuevaPelis)
    }

    const handleFilterChange = (filtro: ValoresFiltros): void => {
        // console.log(filtro)
        setFiltroSeleccionado(filtro)
    }

    const contadorActivo = pelis.filter(peli => !peli.vista).length
    const contadorCompleto = pelis.length - contadorActivo
    console.log(contadorCompleto)

    const pelisFiltradas = pelis.filter(peli => {
        if (filtroSeleccionado === ESTADO_PELIS.ACTIVE) {
            return !peli.vista
        }
        if (filtroSeleccionado === ESTADO_PELIS.COMPLETED) {
            return peli.vista
        }

        return peli
    })

    return (
        <>
            <div className="todoapp">
                <Items
                    onCheckCompleted={handleCompletado}
                    onRemovePeli={handleRemover}
                    items={pelisFiltradas} />
            </div>
            <Footer
                contadorActivo={contadorActivo}
                contadorCompleto={contadorCompleto}
                filtroSeleccionado={filtroSeleccionado}
                handleFilterChange={handleFilterChange}
                onClearDone={() => { }}
            />
        </>
    )
}

export default Home