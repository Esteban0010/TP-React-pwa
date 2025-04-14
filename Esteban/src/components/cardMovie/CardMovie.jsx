import React, {useEffect,useState}from 'react'
import style from "./CardMovie.module.css"

function CardMovie({titulo,director,anio,genero,rating,tipo,vista,handleChangeVista}) {
 const [isChecked,setIsChecked]=useState(false)
  useEffect(() => {
    setIsChecked(true); 
  }, []);
  return (
    <div className={style.card}>{vista? <div className={style.banner}>
    <span className={style.banner_text}>VISTA</span>
    <span className={style.banner_text}>VISTA</span>
  </div>: null}
     
      <span>{titulo}</span>
      <span>{director}</span>
      <h2>{anio}</h2>
      <h2>{genero}</h2>
      <h2>{rating}</h2>
      <h2>{tipo}</h2>
      <input 
      type="checkbox" 
      id="miCheckbox" 
      onChange={handleChangeVista}
      checked={isChecked}
       />
      <label htmlFor="miCheckbox">Pelicula vista</label>
    </div>
  )
}

export default CardMovie

