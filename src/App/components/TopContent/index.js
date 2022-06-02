import React from 'react'
import "./style.css"
const TopContent = ({type, descrpt}) => {
  return (
        <h3>
          {type} <span>{descrpt}</span>
        </h3>
 
  )
}

export default TopContent