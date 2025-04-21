import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
// /user/alltickts
export default function DashboardSummary() {
    const[alltiktes,setalltiktes]=useState([]);
    const [token, setToken] = useState("");
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


  return (
    <div className="container py-4">
      {/* Summary Cards */}
      <div className="row g-4 mb-4">
        <div className="col-md-3">
          <div className="card text-black bg-light  h-100 shadow">
            <div className="card-body">
              <h5 className="card-title">🎫 Total Tickets</h5>
              <p className="card-text display-6">124</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-black  bg-light  h-100 shadow">
            <div className="card-body">
              <h5 className="card-title">✅ Réalisés</h5>
              <p className="card-text display-6">86</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-black  bg-light h-100 shadow">
            <div className="card-body">
              <h5 className="card-title">⚙️ En cours</h5>
              <p className="card-text display-6">28</p>
            </div>
          </div>
        </div>
        <div className="col-md-3">
          <div className="card text-black  bg-light shadow">
            <div className="card-body">
              <h5 className="card-title">❌ Annulés</h5>
              <p className="card-text display-6">10</p>
            </div>
          </div>
        </div>
      </div>

      {/* Ticket Cards */}
      <h4 className="mb-3">📝 Détails des tickets</h4>
      <div className="row g-4">
        {alltiktes.map((ticket, index) => (
          <div key={index} className="col-md-3">
            <div className="card  shadow-sm" style={{ height: '200px' }}>
              <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-text text-muted">{ticket.description}</p>
                <p className="card-text text-muted">{ticket.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
