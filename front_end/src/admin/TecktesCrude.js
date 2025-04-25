import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Modal, Button } from 'react-bootstrap';
import { FaEdit, FaTrash, FaPlus, FaSearch } from 'react-icons/fa';

export default function TecktesCrude() {
  const [token, setToken] = useState("");
  const [reclamtion, setReclamtion] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedTiktes, setSelectedTicktes] = useState(null);
  const [allagent, setAgent] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const title = useRef();
  const description = useRef();
  const title_up = useRef();
  const description_up = useRef();
  const idagent = useRef();
  const idagent_up = useRef();

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

  const allgent = async () => {
    try {
      const res = await axios.get("http://localhost:8093/admin/allagent", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setAgent(res.data);
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
      allgent();
    }
  }, [token]);

  const filteredTickets = reclamtion.filter(ticket => 
    ticket.user_AGENT?.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.user_id?.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ticket.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const deleteTicktes = async (id) => {
    try {
      await axios.get(`http://localhost:8093/admin/tickes/delte/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      getData();
    } catch (error) {
      console.log("error tickes pas delette: " + error);
    }
  };

  const updateTicktes = async (id) => {
    const newticktes = {
      "title": title_up.current.value,
      "description": description_up.current.value,
      "user_agent": idagent_up.current.value,
    };
    try {
      await axios.post(`http://localhost:8093/admin/tickes/update/${id}`, newticktes, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setShowEditModal(false);
      getData();
    } catch (error) {
      console.log("error ticktes pas update: " + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newticktes = {
      "title": title.current.value,
      "description": description.current.value,
      "user_agent": idagent.current.value,
    };
    try {
      await axios.post(`http://localhost:8093/admin/ajouttikets`, newticktes, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      title.current.value = "";
      description.current.value = "";
      setShowAddModal(false);
      getData();
    } catch (error) {
      console.log("error ticktes pas ajoute: " + error);
    }
  };

  return (
    <div className="container-fluid p-4">
      <div className="card border-0 shadow-sm">
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Ticket Management</h2>
            <div className="d-flex">
              <div className="w-25 me-3">
                <input
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
                Add Ticket
              </button>
            </div>
          </div>

          <div className="mb-4">
            <h5 className="text-muted mb-3">All Tickets</h5>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="bg-light">
                  <tr>
                    <th>Agent Name</th>
                    <th>User Email</th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTickets.map((u) => (
                    <tr key={u.id} style={{ backgroundColor: u.status == "termine" ? '#ffebee' : 'white' }}>
                      <td>{u.user_AGENT?.nom}</td>
                      <td>{u.user_id?.email}</td>
                      <td>{u.description}</td>
                      <td>
                        <span className={`badge ${
                          u.status === 'termine' ? 'bg-success' : 
                          u.status === 'en cours' ? 'bg-warning text-dark' : 'bg-secondary'
                        }`}>
                          {u.status}
                        </span>
                      </td>
                      <td>
                        <button 
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => { setSelectedTicktes(u); setShowEditModal(true); }}
                          title="Edit"
                        >
                          <FaEdit />
                        </button>
                        <button 
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => deleteTicktes(u.id)}
                          title="Delete"
                        >
                          <FaTrash />
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

      {/* Add Ticket Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Add New Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title</label>
              <input type="text" ref={title} className="form-control" placeholder="Enter title" required />
            </div>
            <div className="mb-3">
              <label className="form-label">Description</label>
              <textarea className="form-control" rows="4" placeholder="Enter description" ref={description} required></textarea>
            </div>
            <div className="mb-3">
              <label className="form-label">Agent</label>
              <select ref={idagent} className="form-select" required>
                {allagent.map((agent) => (
                  <option key={agent.id} value={agent.id}>{agent.nom}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={() => setShowAddModal(false)} className="me-2">
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Add Ticket
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Edit Ticket Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
        <Modal.Header closeButton className="bg-light">
          <Modal.Title>Edit Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input type="text" ref={title_up} defaultValue={selectedTiktes?.title} className="form-control" required />
          </div>
          <div className="mb-3">
            <label className="form-label">Description</label>
            <textarea className="form-control" rows="4" ref={description_up} defaultValue={selectedTiktes?.description} required></textarea>
          </div>
          <div className="mb-3">
            <label className="form-label">Agent</label>
            <select ref={idagent_up} className="form-select" required>
              {allagent.map((agent) => (
                <option 
                  key={agent.id} 
                  value={agent.id}
                  selected={agent.id === selectedTiktes?.user_AGENT?.id}
                >
                  {agent.nom}
                </option>
              ))}
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={() => updateTicktes(selectedTiktes?.id)}>Save Changes</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}