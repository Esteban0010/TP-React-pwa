import Titulo from "../Titulo/Titulo";
import style from "./CardMovie.module.css"

function CardMovie({ titulo, director, anio, genero, rating, tipo, vista, handleRemove, handleEditar }) {
  return (
    <div className={style.card}>
      {vista ? (
        <div className={style.banner}>
          <span className={style.banner_text}>VISTA</span>
        </div>
      ) : null}
      <Titulo titulo={titulo} />
      <p><strong>Director: </strong>{director}</p>
      <p><strong>Año: </strong>{anio}</p>
      <p><strong>Género: </strong>{genero}</p>
      <p><strong>Rating: </strong>{rating}</p>
      <p><strong>Tipo: </strong>{tipo}</p>
      <button onClick={handleEditar}>Editar</button>
      <button onClick={handleRemove}>x</button>
    </div>
  );
}

export default CardMovie

