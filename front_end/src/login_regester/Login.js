import axios from 'axios'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Login({usr}) {
  const [etat,setEat]=useState(false);
  const nvigate=useNavigate();
  const email=useRef()
  const password=useRef()
  const [donne,setdonne]=useState({})
  const handesubmit=async(e)=>{
e.preventDefault();
// console.log(email.current.value);
// console.log(password.current.value);
const loginData={
  "email":email.current.value,
  "password":password.current.value
}
// setdonne((values)=>({...values,[email.current.name]:email.current.value,[password.current.name]:password.current.value}))
try{
  const res=await axios.post("http://localhost:8099/auth/login",loginData);
  setdonne(res.data);
      
  localStorage.setItem("user",JSON.stringify(res.data))
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
  setEat(true);
  
}catch(error){
  console.log(" il y a une erreur :", error.response.data.message );
}




  }
  useEffect(()=>{
    console.log(donne)
 
    // console.log("user conect   "+JSON.parse(localStorage.getItem("user")))
    
  },[etat]);
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
