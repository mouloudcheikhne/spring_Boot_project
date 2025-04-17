
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import "./service.css"
export default function Service(props) {
  const [token, setToken] = useState("");
   const [users, setUsers] = useState([]);
   const [showModal, setShowModal] = useState(false);
   const [selectedUser, setSelectedUser] = useState(null);
   const vrai=()=>{
    return localStorage.getItem("user")?true:false;
   }
   const description=useRef();
   useEffect(() => {
       const user = localStorage.getItem("user");
       if (user) {
         const a = JSON.parse(user);
         setToken(a.token);
       }
     }, []);
   
     useEffect(() => {
       if (token) {
         
       }
     }, [token]);
     const ajoute=async(id)=>{
      const reclamtion={
        "description":description.current.value,
      }
      try{
        axios.post(`http://localhost:8099/user/recalamtion/${id}`,reclamtion,{
          headers:{
            Authorization: `Bearer ${token}`
          }
        })
        console.log(id)
      } catch(error){
          console.log("errr  = "+error);
      }
     }
  return (
    <div className='service'>
        <h2>{props.service.nom}</h2>
        <p>{props.service.description}</p>
        {vrai() &&  <button className="btn btn-primary" onClick={() => { setSelectedUser(props.service.id); setShowModal(true); }}>
                  Modifier
                </button>}
       

                  <Modal show={showModal} >
                        <Modal.Header closeButton>
                          <Modal.Title>Modifier l'utilisateur</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                          <input type="text" ref={description}  className="form-control mb-2" />
                        
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                          <Button variant="primary" onClick={() => (ajoute(selectedUser) ,setShowModal(false))}>ajoute</Button>
                        </Modal.Footer>
                      </Modal>
    </div>
  )
}
