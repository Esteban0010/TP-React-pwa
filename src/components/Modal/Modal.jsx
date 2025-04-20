import { useEffect } from "react"
import styles from "./Modal.module.css"

const Modal = ({ abrirModal, cerrarModal, children }) => {
    useEffect(() => {
        const handleEscapeModal = (event) => {
            if (event.key === "Escape") {
                cerrarModal()
            }
        }

        if (abrirModal) {
            document.addEventListener("keydown", handleEscapeModal)
        }
        return () => {
            document.removeEventListener("keydown", handleEscapeModal)
        }
    }, [abrirModal, cerrarModal])

    const disparar = null
    if (!abrirModal) return disparar

    return (
        <div className={styles.overlay}>
            <div
                className={styles.modal}
                onClick={(event) => {
                    if (event.target === event.currentTarget) {
                        cerrarModal()
                    }
                }}
            >
                <div>
                    <button onClick={cerrarModal}>x</button>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal