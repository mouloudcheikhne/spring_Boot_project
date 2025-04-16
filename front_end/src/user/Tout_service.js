import React, { useEffect, useState } from 'react';
import Service from "./Service";
import tout_service from "./tout_service.css";
import axios from 'axios';
export default function Tout_service() {
  const[services,setservices]=useState([])
  useEffect(()=>{
    axios.get("http://localhost:8099/service")
    .then(res=>{
      setservices(res.data);
      // console.log(res.data);
      
    }).catch(error=>console.log("erer "+error))
  },[])
  return (
    
<div className='tout_service'>
       {services.map(service=>(
        <Service key={service.id} service={service}/>
       ))}
        
       

    </div>

    
  )
}
