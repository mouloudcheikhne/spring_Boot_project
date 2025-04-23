
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
      const[allagent,setAgent]=useState([]);
    const status=["open","finich","en attent"];
    const PiTrendDownFill = async (tickt) => {
        const iduser = tickt.user_id.id;
        const ticktid = tickt.id;
        console.log(API_URL);
      
        try {
          const res = await axios.get(`http://localhost:8093/agent/hhhh/${ticktid}/${iduser}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
         
          setStokecommit(res.data); 
          console.log(res.data);
        } catch (error) {
          console.log("le donne pas requipere" + error);
        }
      
        console.log(tickt);
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
          const res = await axios.get("http://localhost:8093/admin/allagent", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          console.log("donne est:"+res.data);
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


  return (
    <>
 
 <ul>
  {ticktes.map((tickt) => (
    <li key={tickt.id}>
      <button
        className="btn btn-primary"
        onClick={() => PiTrendDownFill(tickt)}
      >
        {tickt.title}
      </button>
    </li>
  ))}
</ul>

<div>
  <h1>Affichage</h1> 
  
  {teckecommit ? (
    <div>
      {teckecommit.map((commit, index) => (
        <p key={index}>{commit.message}</p>
      ))}
    </div>
  ) : (
    "Chargement..."
  )}
</div>


        
   
    </>
  )
}
