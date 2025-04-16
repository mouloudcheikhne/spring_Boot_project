import React from 'react'
import "./service.css"
export default function Service(props) {
 
  return (
    <div className='service'>
        <h2>{props.service.nom}</h2>
        <p>{props.service.description}</p>
    </div>
  )
}
