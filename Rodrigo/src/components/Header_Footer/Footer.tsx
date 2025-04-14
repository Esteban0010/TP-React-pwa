import { Filtro } from "../Buttons/Filtro"
import { ValoresFiltros } from "../../utils/types"

interface Props {
    contadorActivo: number
    contadorCompleto: number
    filtroSeleccionado: ValoresFiltros
    onClearDone: () => void
    handleFilterChange: (filtro: ValoresFiltros) => void
}

export const Footer: React.FC<Props> = ({
    contadorActivo = 0,
    contadorCompleto = 0,
    filtroSeleccionado,
    handleFilterChange,
    onClearDone
}) => {
    return (
        <footer className="footer">
            <span className="todo-count">
                <strong>{contadorActivo}</strong> pelis o series por ver!
            </span>
            <Filtro
                filtroSeleccionado={filtroSeleccionado}
                onFiltroChange={handleFilterChange}
            />
        </footer>
    )
}