import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
export default function Allticktes() {
     const [showModal, setShowModal] = useState(false);
     const[idticktes,setidticktes]=useState();
    const[alltiktes,setalltiktes]=useState([]);
    const [token, setToken] = useState("");
    const messege=useRef();
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
              console.log(res.data);
              setalltiktes(res.data);
            } catch (error) {
              console.error("Erreur récupération agents :", error);
            }
          }
        };
    
        fetchTokenAndAgents();
      }, []);

      const ajoute=async(id)=>{
        const comentaier={
            "ticket_id":idticktes,
            "message":messege.current.value
        }
        console.log(comentaier);
         try {
              await axios.post("http://localhost:8093/user/ticket_comments",comentaier, {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });
              setShowModal(false)
            //   console.log(res.data);
            //   setalltiktes(res.data);
            } catch (error) {
              console.error("Erreur de ajoute une commit  :", error);
            }
          }

      
  return (
<>
<h4 className="mb-3">📝 Détails des tickets</h4>
      <div className="row g-4">
        {alltiktes.map((ticket, index) => (
          <div key={index} className="col-md-3">
            <div className="card  shadow-sm" style={{ height: '200px' }}>
              <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-text text-muted">{ticket.description}</p>
                <p className="card-text text-muted">{ticket.status}</p>
                {/* setidticktes */}
                <button className="btn btn-primary" onClick={() => { setidticktes(ticket.id); setShowModal(true); }}>ajout conmentair</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Modal show={showModal} >
              <Modal.Header closeButton>
                <Modal.Title>ajoute commit</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="text" ref={messege} className="form-control mb-2" />
                
               
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                <Button variant="primary" onClick={() => ajoute(idticktes)}>Enregistrer</Button>
              </Modal.Footer>
        </Modal>
</>
     
  )
}
