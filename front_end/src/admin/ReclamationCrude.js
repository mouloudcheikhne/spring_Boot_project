import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function ReclamationCrude() {
      const [token, setToken] = useState("");
      const [reclamtion, setReclamtion] = useState([]);
    
    const getData = async () => {
        try {
          const res = await axios.get("http://localhost:8099/admin/recalmations", {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
          setReclamtion(res.data);
        } catch (error) {
          console.log("eror l e donne pas gab9ou: " + error);
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
    const deleteReclamtion=async(id)=>{
        // /admin/deleterecalmtion/{id}
        try {
            await axios.get(`http://localhost:8099/admin/deleterecalmtion/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("reclamtion est delte");
            getData();
           
          } catch (error) {
            console.log("error reclamtion pas delette: " + error);
          }
        // console.log(id);
    }
    const updateReclamtion=async(id)=>{
        // http://localhost:8099/admin/changereclamtion/2
        try {
            await axios.get(`http://localhost:8099/admin/changereclamtion/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`
              }
            });
            console.log("reclamtion est change ");
            getData();
           
          } catch (error) {
            console.log("error reclamtion pas change: " + error);
          }
        console.log(id);
    }
  return (
    <>
          <h1 className="mt-5">Liste des reclamtion</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom service</th>
            <th>Email user</th>
            <th>Description</th>
            <th>Etat</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {reclamtion.map((u) => (
            <tr key={u.id} style={{ backgroundColor: u.etat == "termine" ? 'red' : 'white' }}>
              <td>{u.service.nom}</td>
              <td>{u.user.email}</td>
              <td>{u.description}</td>
              <td>{u.etat}</td>
              <td>
                <button className="btn btn-primary" onClick={() => { updateReclamtion(u.id)}}>
                  UPDATE EATT
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteReclamtion(u.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>


   
    </>
  )
}
