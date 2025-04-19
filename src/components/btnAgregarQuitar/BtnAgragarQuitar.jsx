import React from 'react'

function BtnAgragarQuitar({ text, onClick }) {
  return (
    <button onClick={onClick}>
      <h1>{text}</h1>
    </button>
  )
}

export default BtnAgragarQuitar

