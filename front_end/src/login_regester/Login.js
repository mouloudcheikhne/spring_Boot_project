import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({usr}) {
  const nvigate=useNavigate();
  const email=useRef()
  const password=useRef()
  const [donne,setdonne]=useState({})
  const handesubmit=(e)=>{
e.preventDefault();
// console.log(email.current.value);
// console.log(password.current.value);
const loginData={
  "email":email.current.value,
  "password":password.current.value
}
// setdonne((values)=>({...values,[email.current.name]:email.current.value,[password.current.name]:password.current.value}))
axios.post("http://localhost:8099/auth/login",loginData)
.then((res)=>(
   setdonne(res.data)
   
  ))
.catch((error)=>{
  if (error.response) {
    console.log(" il y a une erreur :", error.response.data.message );
  } else {
    console.log("Erreur inconnue :", error.message);
  }
})


  }
  useEffect(()=>{
    // console.log(donne)
    const l=localStorage.getItem("user");
    if(!l){
      
    }
    
    localStorage.setItem("user",JSON.stringify(donne))
    const a=JSON.parse(localStorage.getItem("user"));
   
    if(a.rol=="USER"){
      usr(a);
      console.log("user== "+a);
      nvigate("/");
      
    }
    if(a.rol=="ADMIN"){
      console.log("admin== "+a);
      usr(a);
      nvigate("/admin");
    }
    else{
      usr(null);
    }
    // console.log("user conect   "+JSON.parse(localStorage.getItem("user")))
    
  },[donne]);
  return (
    <div>
      <h3>Login</h3>
      <form method='post' onSubmit={handesubmit}>
      <input type='text' ref={email} name="email" placeholder='entre email'/><br/>
      <input type='text' ref={password} name="password" placeholder='entre password'/><br/>
      <button>valide</button>

      </form>

    </div>
  )
}
