import Titulo from "../Titulo/Titulo";
import Button from "../BtnAgregarEditar/Button"
import style from "./CardMovie.module.css"

function CardMovie({ titulo, director, anio, genero, rating, tipo, vista, handleRemove, handleEditar,  handleMarcarVista, id }) {
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
      <p><strong>Rating:</strong> {rating} ⭐</p>
      <p><strong>Tipo: </strong>{tipo}</p>

      

      
      <Button
  text={vista ? "Desmarcar" : "Marcar como vista"}
  onClick={() => handleMarcarVista(id)}
/>

      <Button
        className={``}
        text={"Editar"}
        onClick={() => handleEditar({ id, titulo, director, anio, genero, rating, tipo, vista })}
      />
      <Button className={``} text={"Borrar"} onClick={handleRemove} />
    </div>
  );
}



export default CardMovie

