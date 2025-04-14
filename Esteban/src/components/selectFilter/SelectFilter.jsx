import React from 'react'

function SelectFilter({options}) {
  return (
    <div>
      <select name="" id="">
      {
        options.map((option,index)=> (
         <option value={option}>{option}</option>
        ))
       }
      </select>
    </div>
  )
}

export default SelectFilter
