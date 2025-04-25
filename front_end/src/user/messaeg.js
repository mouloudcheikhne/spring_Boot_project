import React, { useEffect, useState, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import './message.css'; // we’ll create this next

const API_URL = process.env.REACT_APP_API_URL;

export default function Message() {
  const [alltiktes, setalltiktes] = useState([]);
  const [token, setToken] = useState("");
  const [teckecommit, setStokecommit] = useState([]);
  const [temptickte, settemptickte] = useState();
  const [searchQuery, setSearchQuery] = useState(""); // <-- New search query state
  const messagecommit = useRef();

  const toutcommentaire = async (tickt) => {
    try {
      const res = await axios.get(`${API_URL}/user/hhhh/${tickt.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStokecommit(res.data);
      console.log("Response data:", res.data);
    } catch (error) {
      console.log("Error fetching comments:", error);
    }
  };

  useEffect(() => {
    const fetchTokenAndAgents = async () => {
      const user = localStorage.getItem("user");
      if (user) {
        const a = JSON.parse(user);
        setToken(a.token);
        try {
          const res = await axios.get(`${API_URL}/user/alltickts`, {
            headers: { Authorization: `Bearer ${a.token}` },
          });
          setalltiktes(res.data);
        } catch (error) {
          console.error("Error fetching tickets:", error);
        }
      }
    };

    fetchTokenAndAgents();
  }, []);

  const handelmessage = async () => {
    const c = {
      ticket_id: temptickte.id,
      message: messagecommit.current.value,
    };

    try {
      await axios.post(`${API_URL}/user/ticket_comments`, c, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toutcommentaire(temptickte);
      messagecommit.current.value = "";
    } catch (error) {
      console.log("Error sending message:", error);
    }
  };

  // Filtered tickets based on searchQuery
  const filteredTickets = alltiktes.filter((tickt) =>
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
              className="user-box mb-2 p-2"
              onClick={() => {
                settemptickte(tickt);
                toutcommentaire(tickt);
              }}
            >
              <strong>{tickt.user_id.username}</strong>
              <p className="text-muted small">{tickt.title}</p>
            </div>
          ))}
        </div>

        {/* Chat Area */}
        <div className="col-9 chat-area d-flex flex-column">
          <div className="chat-header p-3 border-bottom">
            <h5>{temptickte ? temptickte.user_id.username : "Select a ticket"}</h5>
          </div>

          <div className="chat-body flex-grow-1 p-3">
            {Array.isArray(teckecommit) && teckecommit.map((commit, index) => {
              const isReceived = commit.differenceuser;
              return (
                <div
                  key={index}
                  className={`message-bubble ${isReceived ? 'received' : 'sent'}`}
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
            />
            <button className="btn btn-primary" onClick={handelmessage}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
}
