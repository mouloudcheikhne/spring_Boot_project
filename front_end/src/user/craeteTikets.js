import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const API_URL = process.env.REACT_APP_API_URL;
export default function CraeteTikets() {
  const [token, setToken] = useState("");
  const [agents, setAgents] = useState([]);
  const Titre = useRef();
  const description = useRef();
  const agent = useRef();
const navigate = useNavigate();
  useEffect(() => {
    const fetchTokenAndAgents = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const a = JSON.parse(user);
        setToken(a.token);

        try {
          const res = await axios.get(`${API_URL}/user/agent`, {
            headers: {
              Authorization: `Bearer ${a.token}`,
            },
          });
          console.log(res.data);
          setAgents(res.data);
        } catch (error) {
          console.error("Erreur récupération agents :", error);
        }
      }
    };

    fetchTokenAndAgents();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const ticket = {
      title: Titre.current.value,
      description: description.current.value,
      user_agent: agent.current.value,
    };
    console.log(ticket);

    try {
      await axios.post(`${API_URL}/user/ticket`, ticket, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Clear les champs
      Titre.current.value = "";
      description.current.value = "";
      agent.current.value = "";
      
      navigate("/tickets");
    //   alert("Ticket envoyé avec succès !");
    } catch (error) {
      console.error("Erreur envoi ticket :", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">🎫 Créer un Ticket</h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Titre</label>
              <input type="text" className="form-control" id="title" placeholder="Entrez le titre du ticket" ref={Titre} />
            </div>

            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description</label>
              <textarea className="form-control" id="description" rows="4" placeholder="Décrivez le problème..." ref={description}></textarea>
            </div>

            <div className="mb-3">
              <label htmlFor="agent" className="form-label">Affecter à</label>
              <select className="form-select" id="agent" ref={agent}>
                <option value="">-- Sélectionner un agent --</option>
                {agents.map((ag, index) => (
                  <option key={index} value={ag.id}>{ag.nom || ag.email}</option>
                ))}
              </select>
            </div>

            <button type="submit" className="btn btn-success w-100">Envoyer le Ticket</button>
          </form>
        </div>
      </div>
    </div>
  );
}
