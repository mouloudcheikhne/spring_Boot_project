import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaPlus } from 'react-icons/fa';

export default function Users() {
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [users, setUsers] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const rols = ["ADMIN", "USER", "AGENT"];

  const email = useRef();
  const nom = useRef();
  const prenom = useRef();
  const password = useRef();
  const rol = useRef();

  const nom_up = useRef();
  const prenom_up = useRef();
  const email_up = useRef();

  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:8093/admin/users", {
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

  const filteredUsers = users.filter(user => 
    user.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newUser = {
      nom: nom.current.value,
      prenom: prenom.current.value,
      email: email.current.value,
      password: password.current.value,
      rol: rol.current.value,
    };
    try {
      await axios.post("http://localhost:8093/admin/regester", newUser, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      nom.current.value = "";
      prenom.current.value = "";
      email.current.value = "";
      password.current.value = "";
      getData();
      setShowAddModal(false);
    } catch (error) {
      console.log("error le user pas ajoute  : " + error);
    }
  };

  const update = async (id, pass) => {
    const userUp = {
      nom: nom_up.current.value,
      prenom: prenom_up.current.value,
      email: email_up.current.value,
    };
    try {
      await axios.put(`http://localhost:8093/admin/updateuser/${id}`, userUp, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getData();
      setShowEditModal(false);
    } catch (error) {
      console.log("eror le user pas modifie : " + error);
    }
  };

  const deleteUser = async (id) => {
    try {
      await axios.get(`http://localhost:8093/admin/deleteuser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getData();
    } catch (error) {
      console.log("Erreur lors de la suppression de l'utilisateur : " + error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">User Management</h2>
            <div className="d-flex">
              <div className="w-25 me-3">
                <input
                  // style={{width: "250px"}}
                  type="text"
                  className="form-control"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button 
                className="btn btn-primary"
                onClick={() => setShowAddModal(true)}
              >
                <FaPlus className="me-2" />
                Add User
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-muted mb-3">All Roles</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>USER</th>
                    <th>EMAIL</th>
                    <th>ROLE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((u) => (
                    <tr key={u.id}>
                      <td>{u.nom} {u.prenom}</td>
                      <td>{u.email}</td>
                      <td>
                        <span className={`badge ${
                          u.role === 'ADMIN' ? 'bg-danger' : 
                          u.role === 'AGENT' ? 'bg-warning text-dark' : 'bg-primary'
                        }`}>
                          {u.role}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => { setSelectedUser(u); setShowEditModal(true); }}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteUser(u.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">First Name</label>
                <input type="text" ref={prenom} className="form-control" placeholder="Enter first name" required />
              </div>
              <div className="col-md-6 mb-3">
                <label className="form-label">Last Name</label>
                <input type="text" ref={nom} className="form-control" placeholder="Enter last name" required />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input type="email" ref={email} className="form-control" placeholder="Enter email" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input type="password" ref={password} className="form-control" placeholder="Enter password" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Role</label>
              <select ref={rol} className="form-select" required>
                {rols.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowAddModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add User
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input type="text" ref={prenom_up} defaultValue={selectedUser?.prenom} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input type="text" ref={nom_up} defaultValue={selectedUser?.nom} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" ref={email_up} defaultValue={selectedUser?.email} className="form-control" required />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => update(selectedUser?.id, selectedUser?.password)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}