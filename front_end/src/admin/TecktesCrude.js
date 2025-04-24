import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function TecktesCrude() {
      const [token, setToken] = useState("");
      const [reclamtion, setReclamtion] = useState([]);
      const [showModal, setShowModal] = useState(false);
        const [selectedTiktes, setSelectedTicktes] = useState(null);
      const[allagent,setAgent]=useState([]);
    const getData = async () => {
        try {
          const res = await axios.get("http://localhost:8093/admin/tickes", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setReclamtion(res.data);
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
    const deleteTicktes=async(id)=>{
        // /admin/deleterecalmtion/{id}
        // console.log(token);
        try {
            await axios.get(`http://localhost:8093/admin/tickes/delte/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("tickes est delte");
            getData();
           
          } catch (error) {
            console.log("error tickes pas delette: " + error);
          }
        console.log(id);
    }
    const updateTicktes=async(id)=>{
      const newticktes={
        "title":title_up.current.value,
        "description":description_up.current.value,
        "user_agent":idagent_up.current.value,
      }
      console.log(newticktes);
        // http://localhost:8099/admin/changereclamtion/2

        try {
            await axios.post(`http://localhost:8093/admin/tickes/update/${id}`,newticktes, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("tickes est update  ");
            setShowModal(false);

            getData();
           
          } catch (error) {
            console.log("error ticktes pas update: " + error);
          }
        console.log(id);
    }
    const handleSubmit=async(e)=>{
      e.preventDefault();
      const newticktes={
        "title":title.current.value,
        "description":description.current.value,
        "description":description.current.value,
        "user_agent":idagent.current.value,
      }
      try {
        await axios.post(`http://localhost:8093/admin/ajouttikets`,newticktes, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        console.log("tickes est ajoute ");
        title.current.value="";
        description.current.value="";
        getData();
       
      } catch (error) {
        console.log("error ticktes pas ajoute: " + error);
      }
      // /admin/ajouttikets

      console.log(newticktes);
    }
    const title=useRef();
    const description=useRef();
    const title_up=useRef();
    const description_up=useRef();
    const idagent=useRef();
    const idagent_up=useRef();
  return (
    <>
      <h2>Ajouter un ticktes</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={title} placeholder="titel" className="form-control mb-2" />
        
        <textarea className="form-control mb-2" id="description" rows="4" placeholder="Décrivez le problème..." ref={description}></textarea>
        <select ref={idagent} className="form-control mb-3">
          {allagent.map((r)=>{
            return <option value={r.id}>{r.nom}</option>
          })}

        </select>
        <button className="btn btn-success">Ajouter</button>
      </form>
          <h1 className="mt-5">Liste des ticktes</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom Agent</th>
            <th>Email user</th>
            <th>Description</th>
            <th>Etat</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {reclamtion.map((u) => (
            <tr key={u.id} style={{ backgroundColor: u.status == "termine" ? 'red' : 'white' }}>
             <td>{u.user_AGENT?.nom}</td>
              <td>{u.user_id.email}</td>
              <td>{u.description}</td>
              <td>{u.status}</td>
              <td>
                <button className="btn btn-primary" onClick={() => {setSelectedTicktes(u);setShowModal(true);}}>
                  UPDATE EATT
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteTicktes(u.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

           <Modal show={showModal} >
                  <Modal.Header closeButton>
                    <Modal.Title>Modifier l'utilisateur</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <input type="text" ref={title_up} defaultValue={selectedTiktes?.title} className="form-control mb-2" />
                    <textarea className="form-control mb-2" id="description" rows="4" placeholder="Décrivez le problème..." ref={description_up}>{selectedTiktes?.description}</textarea>
                    <select ref={idagent_up} className="form-control mb-3">
                        {allagent.map((r)=>{
                          return <option value={r.id}>{r.nom}</option>
                        })}

                      </select>
                  </Modal.Body>
                  <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
                    <Button variant="primary" onClick={() => updateTicktes(selectedTiktes?.id)}>Enregistrer</Button>
                  </Modal.Footer>
                </Modal>
   
    </>
  )
}
