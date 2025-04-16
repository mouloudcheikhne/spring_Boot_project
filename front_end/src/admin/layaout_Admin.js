import React from 'react'
import { Link, Outlet } from 'react-router-dom'
import "./layout_admin.css"
import axios from 'axios'
export default function Layaout_Admin() {
    var token="";
    const etatUser=()=>{
        
        return localStorage.getItem("user")?true:false;
        
    }
    if(etatUser){
        const a=localStorage.getItem("user");
        token=JSON.parse(a).token
        // console.log(token)
    }
   
  return (
    <div className='containeer'>
        <div className='nav_admin'>
            <div className='home'>

            <Link to={"/admin"} className='a'>ADMIN</Link>
            <Link to={"/admin/service"} className='a' >service</Link>
            <Link to={"#"} className='a' >reclamation</Link>
            <Link to={"/admin/users"} className='a' >users</Link>
            </div>
            {etatUser?<Link to={"/logout"} className='login_admin'>logout</Link>:<Link to={"/"} className='login_admin'>Login</Link>}
            
            
        </div>
        <Outlet></Outlet>
        
    </div>
  )
}
