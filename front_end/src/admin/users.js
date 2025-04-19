import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';

export default function Users() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const email = useRef();
  const nom = useRef();
  const prenom = useRef();
  const password = useRef();

  const nom_up = useRef();
  const prenom_up = useRef();
  const email_up = useRef();

  
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8091/admin/users", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUsers(res.data);
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

  // Ajouter un user
  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nom: nom.current.value,
      prenom: prenom.current.value,
      email: email.current.value,
      password: password.current.value,
    };
    try {
      await axios.post("http://localhost:8091/auth/signup", newUser);
       nom.current.value = "";
    prenom.current.value = "";
    email.current.value = "";
    password.current.value = "";
      getData();
    } catch (error) {
      console.log("error le user pas ajoute  : " + error);
    }
  };

  // update  user
  const update = async (id, pass) => {
    const userUp = {
      nom: nom_up.current.value,
      prenom: prenom_up.current.value,
      email: email_up.current.value,
    };
    try {
      await axios.put(`http://localhost:8091/admin/updateuser/${id}`, userUp,{
        headers: {
          Authorization: `Bearer ${token}`
        }}
      );
      getData();
      setShowModal(false);
    } catch (error) {
      console.log("eror le user pas modifie : " + error);
    }
  };

  // delete user
  const deleteUser = async (id) => {
    try {
      await axios.get(`http://localhost:8091/admin/deleteuser/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`
        }});
      getData();
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur : " + error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Ajouter un utilisateur</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" ref={nom} placeholder="Nom" className="form-control mb-2" />
        <input type="text" ref={prenom} placeholder="Prénom" className="form-control mb-2" />
        <input type="email" ref={email} placeholder="Email" className="form-control mb-2" />
        <input type="password" ref={password} placeholder="Mot de passe" className="form-control mb-2" />
        <button className="btn btn-success">Ajouter</button>
      </form>

      <h1 className="mt-5">Liste des utilisateurs</h1>
      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Modifier</th>
            <th>Supprimer</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.nom}</td>
              <td>{u.prenom}</td>
              <td>{u.email}</td>
              <td>
                <button className="btn btn-primary" onClick={() => { setSelectedUser(u); setShowModal(true); }}>
                  Modifier
                </button>
              </td>
              <td>
                <button className="btn btn-danger" onClick={() => deleteUser(u.id)}>
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal de mise à jour */}
      <Modal show={showModal} >
        <Modal.Header closeButton>
          <Modal.Title>Modifier l'utilisateur</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input type="text" ref={nom_up} defaultValue={selectedUser?.nom} className="form-control mb-2" />
          <input type="text" ref={prenom_up} defaultValue={selectedUser?.prenom} className="form-control mb-2" />
          <input type="email" ref={email_up} defaultValue={selectedUser?.email} className="form-control mb-2" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Fermer</Button>
          <Button variant="primary" onClick={() => update(selectedUser?.id, selectedUser?.password)}>Enregistrer</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
