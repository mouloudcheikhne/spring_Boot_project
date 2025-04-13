import axios from 'axios';
import React, { useEffect, useRef } from 'react'

export default function Regester() {
  const nom=useRef();
  const prenom=useRef();
  const email=useRef();
  const password=useRef();
  const handelsubmit=(e)=>{
    e.preventDefault();
    const user={
      "nom":nom.current.value,
      "prenom":prenom.current.value,
      "email":email.current.value,
      "password":password.current.value,
    }
    axios.post("http://localhost:8099/auth/signup",user)
    .then((res)=>console.log(res.data))
    .catch((error)=>console.log(error.response.data.message))
    console.log(user)
  }
  return (
    <div>
      <h3>regester</h3>
      <form method='post' onSubmit={handelsubmit}>

      <input type="text" ref={nom} name='nom' placeholder="entre nom"/><br/>
      <input type="text" ref={prenom} name='prenom' placeholder="entre prenom"/><br/>
      <input type="text" ref={email} name='email' placeholder="entre nom"/><br/>
      <input type="text"ref={password}  name='password' placeholder="entre password"/><br/>
      <button>valide</button>
      </form>

    </div>
  )
}
