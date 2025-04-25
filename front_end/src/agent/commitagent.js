import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './message.css'; // Make sure to create this file with the CSS provided

const API_URL = process.env.REACT_APP_API_URL;

export default function CommitAgent() {
  const [token, setToken] = useState("");
  const [ticktes, setTicktes] = useState([]);
  const [teckecommit, setStokecommit] = useState([]);
  const [temptickte, settemptickte] = useState();
  const [allagent, setAgent] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const status = ["open", "finich", "en attent"];
  const messagecommit = useRef();

  const PiTrendDownFill = async (tickt) => {
    const iduser = tickt.user_id.id;
    const ticktid = tickt.id;
    
    try {
      const res = await axios.get(`${API_URL}/agent/hhhh/${ticktid}/${iduser}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setStokecommit(res.data); 
    } catch (error) {
      console.log("le donne pas requipere" + error);
    }
  };
  
  const getData = async () => {
    try {
      const res = await axios.get(`${API_URL}/agent/alltickts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setTicktes(res.data);
    } catch (error) {
      console.log("eror l e donne pas gab9ou: " + error);
    }
  };

  const allgent = async () => {
    try {
      const res = await axios.get(`${API_URL}/admin/allagent`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
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
    }
  }, [token]);

  const handelmessage = async () => {
    const c = {
      "ticket_id": temptickte.id,
      "userid": temptickte.user_id.id,
      "message": messagecommit.current.value
    }
    
    try {
      await axios.post(`${API_URL}/agent/ajoutecommit`, c, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      PiTrendDownFill(temptickte);
      messagecommit.current.value = "";
    } catch (error) {
      console.log("le commit pas faire : " + error);
    }
  }

  // Filter tickets based on search query
  const filteredTickets = ticktes.filter((tickt) =>
    tickt.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container-fluid message-container">
      <div className="row">
        {/* Sidebar - Tickets List */}
        <div className="col-3 sidebar p-3">
          <input
            type="text"
            className="form-control mb-3"
            placeholder="Search by ticket name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filteredTickets.map((tickt) => (
            <div
              key={tickt.id}
              className={`user-box mb-2 p-2 ${temptickte?.id === tickt.id ? 'active' : ''}`}
              onClick={() => {
                settemptickte(tickt);
                PiTrendDownFill(tickt);
              }}
            >
              {/* <strong>{tickt.title}</strong> */}
              <p className="text-muted small">{tickt.title}</p>
              {/* <span className={`badge ${status.includes(tickt.status?.toLowerCase()) ? 'bg-warning' : 'bg-secondary'}`}>
                {tickt.status}
              </span> */}
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="col-9 chat-area d-flex flex-column">
          <div className="chat-header p-3 border-bottom">
            <h5>{temptickte ? `${temptickte.title}` : "Select a ticket"}</h5>
            <span className="text-muted small">
              {temptickte?.status && `Status: ${temptickte.status}`}
            </span>
          </div>

          <div className="chat-body flex-grow-1 p-3">
            {Array.isArray(teckecommit) && teckecommit.map((commit, index) => {
              const isReceived = commit.differenceuser;
              return (
                <div
                  key={index}
                  className={`message-bubble ${isReceived ? 'sent' : 'received'}`}
                >
                  {commit.message}
                </div>
              );
            })}
          </div>

          <div className="chat-footer p-3 border-top d-flex">
            <input
              type="text"
              ref={messagecommit}
              className="form-control me-2"
              placeholder="Type a message..."
              onKeyPress={(e) => e.key === 'Enter' && handelmessage()}
            />
            <button className="btn btn-primary" onClick={handelmessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}