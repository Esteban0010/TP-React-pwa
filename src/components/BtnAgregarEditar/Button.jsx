import React from 'react'
import styles from './BtnAgregarQuitar.module.css'
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
