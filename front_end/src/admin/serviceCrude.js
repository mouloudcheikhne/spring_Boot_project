
import React, { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
export default function ServiceCrude() {
    const [token, setToken] = useState("");
    const [services, setService] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const nom=useRef();
    const description=useRef();
    const nom_up=useRef();
    const description_up=useRef();
      const [selectedUser, setSelectedUser] = useState(null);
      const getData = async () => {
        try {
          const res = await axios.get("http://localhost:8099/service");
          setService(res.data);
        } catch (error) {
          console.log("error de getall services : " + error);
        }
      };

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
          }
        }, [token]);

    const handleSubmit=async(e)=>{
        e.preventDefault();
        const newservice={
            "nom":nom.current.value,
            "description":description.current.value,
        }
        try{
        await axios.post("http://localhost:8093/admin/allticketcomments", newservice,{
            headers:{
               Authorization: `Bearer ${token}`
            }
        });
        getData();
        nom.current.value = "";
        description.current.value = "";
        
    } catch (error) {
        console.log("error  de  ajoute service : " + error);
    }
        console.log(nom.current.value);
    }
    const deleteService=async(id)=>{
        // console.log(id);
        try{
            await axios.get(`http://localhost:8099/admin/delete/service/${id}`,{
                headers:{
                   Authorization: `Bearer ${token}`
                }
            });
            getData();
            
            
        } catch (error) {
            console.log("error  service pas delete : " + error);
        }
        // http://localhost:8099/admin/delete/service/1
    }
    const update=async(id)=>{
        console.log(id);
        const updateService={
            "id":id,
            "nom":nom_up.current.value,
            "description":description_up.current.value,
        }
        try{
            await axios.post(`http://localhost:8099/admin/updateservice/${id}`,updateService,{
                headers:{
                   Authorization: `Bearer ${token}`
                }
            });
            getData();
            setShowModal(false);
            
            
        } catch (error) {
            console.log("error  service pas update : " + error);
        }
        console.log(updateService);

    }
  return (
    

<div className="container mt-4">
      <h2>Ajouter un service </h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nom} placeholder="Nom" className="form-control mb-2" />
        <input type="text" ref={description} placeholder="description" className="form-control mb-2" />
    
        <button className="btn btn-success">Ajouter</button>
      </form>
      <h1 className="mt-5">Liste des services</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>description</th>
          
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {services.map((u) => (
            <tr key={u.id}>
              <td>{u.nom}</td>
              <td>{u.description}</td>
              
              <td>
                <button className="btn btn-primary" onClick={() => { setSelectedUser(u); setShowModal(true); }}>
                  Modifier
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteService(u.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
       <Modal show={showModal} >
              <Modal.Header closeButton>
                <Modal.Title>Modifier service</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input type="text" ref={nom_up} defaultValue={selectedUser?.nom} className="form-control mb-2" />
                <input type="text" ref={description_up} defaultValue={selectedUser?.description} className="form-control mb-2" />
               
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                <Button variant="primary" onClick={() => update(selectedUser?.id)}>Enregistrer</Button>
              </Modal.Footer>
        </Modal>
    </div>
  )
}
