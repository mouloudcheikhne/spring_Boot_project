import axios from 'axios';
import React, { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom';

export default function Regester() {
  const navi=useNavigate();
  const nom=useRef();
  const prenom=useRef();
  const email=useRef();
  const password=useRef();
  const handelsubmit=async(e)=>{
    e.preventDefault();
    const user={
      "nom":nom.current.value,
      "prenom":prenom.current.value,
      "email":email.current.value,
      "password":password.current.value,
    }
    try{
      await axios.post("http://localhost:8093/auth/signup",user);
      navi("/");
    }catch(error){
        console.log("il ya une error le user pas enregestre")
    }
  //   .then((res)=>console.log(res.data))
  //   .catch((error)=>console.log(error.response.data.message))
  //   console.log(user)
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
