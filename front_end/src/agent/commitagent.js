
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;


export default function CommitAgent() {
    const API_URL = process.env.REACT_APP_API_URL;
      const [token, setToken] = useState("");
      const [ticktes, setTicktes] = useState([]);
      const[teckecommit,setStokecommit]=useState([]);
      const [showModal, setShowModal] = useState(false);
    const [selectedTiktes, setSelectedTicktes] = useState(null);
    const[temptickte,settemptickte]=useState();
      const[allagent,setAgent]=useState([]);
    const status=["open","finich","en attent"];
    const PiTrendDownFill = async (tickt) => {
        const iduser = tickt.user_id.id;
        const ticktid = tickt.id;
        // console.log(API_URL);
      
        try {
          const res = await axios.get(`${API_URL}/agent/hhhh/${ticktid}/${iduser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
         
          setStokecommit(res.data); 
        //   console.log(res.data);
          console.log(temptickte);
        } catch (error) {
          console.log("le donne pas requipere" + error);
        }
      
        // console.log(tickt);
      };
      
    const getData = async () => {
        try {
          const res = await axios.get(`${API_URL}/agent/alltickts`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setTicktes(res.data);
        //   console.log(res.data);
        } catch (error) {
          console.log("eror l e donne pas gab9ou: " + error);
        }
      };
      const allgent=async()=>{
        try {
          const res = await axios.get(`${API_URL}/admin/allagent`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
        //   console.log("donne est:"+res.data);
          setAgent(res.data);
        } catch (error) {
          console.log("eror l e donne pas gab9ou: " + error);
        }
      }
  
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (user) {
        const a = JSON.parse(user);
        setToken(a.token);
      }
    }, []);
  
    useEffect(() => {
      if (token) {
        getData();
        allgent();
        console.log(allagent);
      }
    }, [token]);
const messagecommit=useRef();
const handelmessage=async()=>{
    console.log("message est");
    console.log(temptickte);
    console.log(messagecommit.current.value);
    const c={
        

            "ticket_id":temptickte.id,
            "userid":temptickte.user_id.id,
            "message":messagecommit.current.value
          
    }
    try {
         await axios.post(`${API_URL}/agent/ajoutecommit`,c, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
       
        PiTrendDownFill(temptickte);

        // Optionnel : vider l'input
        messagecommit.current.value = "";
      //   console.log("donne est:"+res.data);
        
      } catch (error) {
        console.log("le commit pas faire : " + error);
      }
    
}
  return (
    <>
 
 <ul>
  {ticktes.map((tickt) => (
    <li key={tickt.id}>
      <button
        className="btn btn-primary"
        onClick={() =>{
            settemptickte(tickt);
            PiTrendDownFill(tickt)} }
      >
        {tickt.title}
      </button>
    </li>
  ))}
</ul>

<div>
  <h1>Affichage</h1> 
  
  {teckecommit && (
  <>
    {teckecommit.map((commit, index) => (
      <p key={index}>{commit.message}</p>
    ))}
    <input type="text" ref={messagecommit} />
    <button onClick={handelmessage}>ajout</button>
  </>
)}
</div>


        
   
    </>
  )
}
