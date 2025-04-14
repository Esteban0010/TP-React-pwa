import { ESTADO_BTNS } from "../../utils/consts"
import { ValoresFiltros } from "../../utils/types"

interface Props {
    // filtroSeleccionado: 'active' | 'completed'
    onFiltroChange: (filtro: ValoresFiltros) => void
    filtroSeleccionado: ValoresFiltros
}

export const Filtro: React.FC<Props> = ({ filtroSeleccionado, onFiltroChange }) => {
    return (
        <ul className="filters">
            {
                Object.entries(ESTADO_BTNS).map(([key, { href, estado }]) => {
                    const seleccionado = key === filtroSeleccionado
                    const className = seleccionado ? 'selected' : ''
                    return (
                        <li key={key}>
                            <a href={href}
                                className={className}
                                onClick={(event) => {
                                    event.preventDefault()
                                    onFiltroChange(key)
                                }}>
                                {estado}
                            </a>
                        </li>
                    )
                })
            }
        </ul>
    )
}