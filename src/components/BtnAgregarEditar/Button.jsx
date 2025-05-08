import React from 'react'
import styles from './BtnAgregarQuitar.module.css'

//Si el componete se llama Button, la carpeta se tiene que llama Button tambien

function Button({ text, onClick, className = "", disabled = false }) {
  return (
    <button
      className={`${styles.base} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  )
}

export default Button
