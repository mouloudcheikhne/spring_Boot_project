import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
// /user/alltickts
export default function Message() {
    const[alltiktes,setalltiktes]=useState([]);
    const [token, setToken] = useState("");
    const[teckecommit,setStokecommit]=useState([]);
    const toutcommentaire = async (tickt) => {
        const iduser = tickt.user_id.id;
        const ticktid = tickt.id;
        // console.log(API_URL);
      
        try {
          const res = await axios.get(`http://localhost:8093/user/hhhh/${ticktid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
      
         
          setStokecommit(res.data); 
        //   console.log(res.data);
        } catch (error) {
          console.log("le donne pas requipere" + error);
        }
      
        // console.log(tickt);
      };
      useEffect(() => {
        const fetchTokenAndAgents = async () => {
          const user = localStorage.getItem("user");
          if (user) {
            const a = JSON.parse(user);
            setToken(a.token);
    
            try {
              const res = await axios.get("http://localhost:8093/user/alltickts", {
                headers: {
                  Authorization: `Bearer ${a.token}`,
                },
              });
            //   console.log(res.data);
              setalltiktes(res.data);
            } catch (error) {
              console.error("Erreur récupération agents :", error);
            }
          }
        };
    
        fetchTokenAndAgents();
      }, []);
      return <>
      
 <ul>
  {alltiktes.map((tickt) => (
    <li key={tickt.id}>
      <button
        className="btn btn-primary"
        onClick={() => toutcommentaire(tickt)}
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

     
}