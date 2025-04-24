import React, { useEffect, useState ,useRef} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
const API_URL = process.env.REACT_APP_API_URL;
// /user/alltickts
export default function Message() {
    const[alltiktes,setalltiktes]=useState([]);
    const [token, setToken] = useState("");
    const[teckecommit,setStokecommit]=useState([]);
    const[temptickte,settemptickte]=useState();
    const toutcommentaire = async (tickt) => {
        const iduser = tickt.user_id.id;
        const ticktid = tickt.id;
        // console.log(API_URL);
      
        try {
          const res = await axios.get(`${API_URL}/user/hhhh/${ticktid}`, {
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
              const res = await axios.get(`${API_URL}/user/alltickts`, {
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
      const messagecommit=useRef();
      const handelmessage=async()=>{
          console.log("message est");
          console.log(temptickte);
          console.log(messagecommit.current.value);
          const c={
              
      
                  "ticket_id":temptickte.id,
                  "message":messagecommit.current.value
                
          }
          try {
               await axios.post(`${API_URL}/user/ticket_comments`,c, {
                headers: {
                  Authorization: `Bearer ${token}`
                }
              });
             
              toutcommentaire(temptickte);
      
              // Optionnel : vider l'input
              messagecommit.current.value = "";
            //   console.log("donne est:"+res.data);
              
            } catch (error) {
              console.log("le commit pas faire : " + error);
            }
          
      }
      return <>
      
 <ul>
  {alltiktes.map((tickt) => (
    <li key={tickt.id}>
      <button
        className="btn btn-primary"
        onClick={() => {
            settemptickte(tickt);
            toutcommentaire(tickt)}}
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

     
}